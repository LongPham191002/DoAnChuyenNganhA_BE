import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Product} from "./entities/product.entity";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) {}

    create(product: Product) {
        return this.productRepository.save(product);
    }

    findAll() {
        return this.productRepository.find();
    }

    async findOne(product_id: number) {
        return this.productRepository.findOne({ where: { product_id } });
    }

    update(id: number, product: Product) {
        return this.productRepository.update(id, product);
    }

    remove(id: number) {
        return this.productRepository.delete(id);
    }
}
