import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity('category')
export class Category {
    @PrimaryGeneratedColumn({ name: 'category_id' })
    category_id: number;

    @Column({ name: 'category_name' })
    category_name: string;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}
