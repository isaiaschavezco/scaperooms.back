import { ProductService } from './product.service';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    findAll(): Promise<any>;
    create(createDTO: CreateProductDTO): Promise<number>;
    shopProducts(createDTO: CreateProductDTO): Promise<number>;
    update(updateProductDTO: UpdateProductDTO): Promise<any>;
    delete(id: any): Promise<any>;
}
