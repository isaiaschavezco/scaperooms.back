import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { User } from '../../users/user/user.entity';
import { Pointsbyuser } from '../../trivia/pointsbyuser/pointsbyuser.entity';
import { PointsType } from '../../trivia/points-type/points-type.entity';
import { CreateProductDTO, UpdateProductDTO, ShopCartProducts } from './product.dto';
import { MailerService } from '@nestjs-modules/mailer';
export declare class ProductService {
    private productRepository;
    private userRepository;
    private pointsbyuserRepository;
    private pointsTypeRepository;
    private readonly mailerService;
    constructor(productRepository: Repository<Product>, userRepository: Repository<User>, pointsbyuserRepository: Repository<Pointsbyuser>, pointsTypeRepository: Repository<PointsType>, mailerService: MailerService);
    findAll(): Promise<any>;
    update(updateProductDTO: UpdateProductDTO): Promise<any>;
    create(createProductDTO: CreateProductDTO): Promise<any>;
    delete(productId: number): Promise<any>;
    registerShopCart(requestDTO: ShopCartProducts): Promise<any>;
}
