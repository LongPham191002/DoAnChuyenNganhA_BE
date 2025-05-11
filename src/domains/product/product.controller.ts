import {Controller, Get, Post, Body, Param, Put, Delete, Patch} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import {UpdateProductDto} from "./dto/update-product.dto";
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    create(@Body() product: Product) {
        return this.productService.create(product);
    }

    @Get()
    findAll() {
        return this.productService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.productService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() product: Product) {
        return this.productService.update(id, product);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.productService.remove(id);
    }

}
