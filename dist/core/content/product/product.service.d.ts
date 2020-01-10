import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { User } from '../../users/user/user.entity';
import { Pointsbyuser } from '../../trivia/pointsbyuser/pointsbyuser.entity';
import { PointsType } from '../../trivia/points-type/points-type.entity';
import { CreateProductDTO, UpdateProductDTO, ShopCartProducts } from './product.dto';
export declare class ProductService {
    private productRepository;
    private userRepository;
    private pointsbyuserRepository;
    private pointsTypeRepository;
    constructor(productRepository: Repository<Product>, userRepository: Repository<User>, pointsbyuserRepository: Repository<Pointsbyuser>, pointsTypeRepository: Repository<PointsType>);
    findAll(): Promise<any>;
    update(updateProductDTO: UpdateProductDTO): Promise<any>;
    create(createProductDTO: CreateProductDTO): Promise<any>;
    delete(productId: number): Promise<any>;
    registerShopCart(requestDTO: ShopCartProducts): Promise<any>;
}
