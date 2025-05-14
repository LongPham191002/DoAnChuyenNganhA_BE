import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Product} from "./entities/product.entity";
import {CreateProductDto} from "./dto/create-product.dto";
import {UpdateProductDto} from "./dto/update-product.dto";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) {}

    create(createProductDto: CreateProductDto) {
        return this.productRepository.save(createProductDto);
    }

    findAll() {
        return this.productRepository.find();
    }

    async findOne(id: number) {
        return this.productRepository.findOne({ where: { product_id: id } });
    }

    update(id: number, updateProductDto: UpdateProductDto) {
        return this.productRepository.update(id, updateProductDto);
    }

    remove(id: number) {
        return this.productRepository.delete(id);
    }
}
