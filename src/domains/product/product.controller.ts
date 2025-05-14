import {Controller, Get, Post, Body, Param, Put, Delete, Patch} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import {UpdateProductDto} from "./dto/update-product.dto";
import {CreateProductDto} from "./dto/create-product.dto";
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto);
    }

    @Get()
    findAll() {
        return this.productService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
        return this.productService.update(id, updateProductDto);
    }



    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productService.remove(+id);
    }

}
