import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { User } from '../../users/user/user.entity';
import { Pointsbyuser } from '../../trivia/pointsbyuser/pointsbyuser.entity';
import { PointsType } from '../../trivia/points-type/points-type.entity';
import { CreateProductDTO, UpdateProductDTO, ShopCartProducts } from './product.dto';
import { MailerService } from '@nest-modules/mailer';

@Injectable()
export class ProductService {

    constructor(@InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Pointsbyuser) private pointsbyuserRepository: Repository<Pointsbyuser>,
        @InjectRepository(PointsType) private pointsTypeRepository: Repository<PointsType>,
        private readonly mailerService: MailerService) { }

    async findAll(): Promise<any> {
        try {
            const productsList = await this.productRepository.find({
                where: { isActive: true },
                order: {
                    title: "ASC"
                }
            });

            return { products: productsList };
        } catch (err) {
            console.log("ProductService - findAll: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting products',
            }, 500);
        }
    }

    async update(updateProductDTO: UpdateProductDTO): Promise<any> {
        try {
            let productToUpdate = await this.productRepository.findOne(updateProductDTO.productId);

            productToUpdate.title = updateProductDTO.title;
            productToUpdate.description = updateProductDTO.description;
            productToUpdate.image = updateProductDTO.image;
            productToUpdate.points = updateProductDTO.points;

            await this.productRepository.save(productToUpdate);

            return { status: 0 };

        } catch (err) {

            console.log("ProductService - create: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error updating product',
            }, 500);
        }
    }

    async create(createProductDTO: CreateProductDTO): Promise<any> {
        try {
            let newProduct = this.productRepository.create({
                title: createProductDTO.title,
                image: createProductDTO.image,
                description: createProductDTO.description,
                points: createProductDTO.points,
                isActive: true
            });

            await this.productRepository.save(newProduct);

            return { status: 0 };

        } catch (err) {

            console.log("ProductService - create: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error creating product',
            }, 500);
        }
    }

    async delete(productId: number): Promise<any> {
        try {

            let productToDelete = await this.productRepository.findOne(productId);
            productToDelete.isActive = false;

            await this.productRepository.save(productToDelete);

            return { status: 0 };
        } catch (err) {
            console.log("ProductService - delete: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error deleting token',
            }, 500);
        }
    }

    async registerShopCart(requestDTO: ShopCartProducts): Promise<any> {
        try {

            let response = { status: 0 };
            let totalPoints = 0;

            const productsToBuy = await this.productRepository.findByIds(requestDTO.products);

            productsToBuy.forEach(product => {
                totalPoints += product.points;
            });

            let userBuying = await this.userRepository.findOne({
                where: { email: requestDTO.email }
            });

            if (userBuying.points < totalPoints) {
                response = { status: 4 };
            } else {
                const pointsType = await this.pointsTypeRepository.findOne(3);

                for (let index = 0; index < productsToBuy.length; index++) {

                    const productToBuy = productsToBuy[index];
                    const pointsToRegister = this.pointsbyuserRepository.create({
                        isAdded: false,
                        isDeleted: false,
                        points: productToBuy.points,
                        pointsType: pointsType,
                        createdAt: new Date(),
                        quizz: null,
                        product: productToBuy,
                        user: userBuying
                    });

                    await this.pointsbyuserRepository.save(pointsToRegister);

                }

                userBuying.points -= totalPoints;

                await this.userRepository.save(userBuying);

                // Falta enviar correo de confirmación a Bioderma
                await this.mailerService.sendMail({
                    to: userBuying.email,
                    subject: 'Confirmación de productos.',
                    template: 'cart',
                    context: {
                        products: productsToBuy
                    },
                });
            }

            return response;
        } catch (err) {
            console.log("ProductService - registerShopCart: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error buying products',
            }, 500);
        }
    }

}