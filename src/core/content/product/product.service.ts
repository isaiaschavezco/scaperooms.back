import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';

@Injectable()
export class ProductService {

    constructor(@InjectRepository(Product) private productRepository: Repository<Product>) { }

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

}