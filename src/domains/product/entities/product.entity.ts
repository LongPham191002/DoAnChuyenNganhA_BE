import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, UpdateDateColumn} from 'typeorm';
import {Category} from "../../category/entities/category.entity";
import {CartItem} from "../../cart-item/entities/cart-item.entity";

@Entity('product')
export class Product {
    @PrimaryGeneratedColumn({ name: 'product_id' }) // <- đúng tên DB
    product_id: number;

    @Column({ name: 'product_name' })
    product_name: string;

    @Column()
    description: string;

    @Column()
    size: string;

    @Column()
    color: string;

    @Column({ name: 'image_url' })
    image_url: string;

    @Column()
    status: 'In Stock' | 'Out of Stock';

    @Column({ name: 'product_quantity' })
    product_quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;


    @Column({ name: 'category_id', nullable: true })
    category_id: number;

    @ManyToOne(() => Category, (category) => category.products, { nullable: true })
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @OneToMany(() => CartItem, (cartItem) => cartItem.order)
    cartItems: CartItem[];

    @UpdateDateColumn({ name: 'update_date', type: 'timestamp', nullable: true })
    update_date: Date;
}
