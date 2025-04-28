import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {}

    create(dto: CreateCategoryDto) {
        const category = this.categoryRepository.create(dto);
        return this.categoryRepository.save(category);
    }

    findAll() {
        return this.categoryRepository.find();
    }

    findOne(id: number) {
        return this.categoryRepository.findOneBy({ category_id: id });
    }

    update(id: number, dto: UpdateCategoryDto) {
        return this.categoryRepository.update(id, dto);
    }

    remove(id: number) {
        return this.categoryRepository.delete(id);
    }
}
