import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';
export declare class ProductService {
    private productRepository;
    constructor(productRepository: Repository<Product>);
    findAll(): Promise<any>;
    update(updateProductDTO: UpdateProductDTO): Promise<any>;
    create(createProductDTO: CreateProductDTO): Promise<any>;
    delete(productId: number): Promise<any>;
}
