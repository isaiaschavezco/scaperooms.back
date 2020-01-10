import { Controller, Body, Get, Post, Delete, Param, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDTO, UpdateProductDTO, ShopCartProducts } from './product.dto';


@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) { }

    @Get()
    async findAll(): Promise<any> {
        return await this.productService.findAll();
    }

    @Post()
    async create(@Body() createDTO: CreateProductDTO): Promise<number> {
        return await this.productService.create(createDTO);
    }

    @Post('cart')
    async shopProducts(@Body() shopCartProducts: ShopCartProducts): Promise<any> {
        return await this.productService.registerShopCart(shopCartProducts);
    }

    @Put()
    async update(@Body() updateProductDTO: UpdateProductDTO): Promise<any> {
        return await this.productService.update(updateProductDTO);
    }

    @Delete(':id')
    async delete(@Param('id') id): Promise<any> {
        return await this.productService.delete(id);
    }

}
