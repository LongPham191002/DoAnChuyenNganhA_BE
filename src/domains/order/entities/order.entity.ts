import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import { User } from "../../users/entities/user.entity";
import {CartItem} from "../../cart-item/entities/cart-item.entity";
import {Payment} from "../../payment/entities/payment.entity";

export type OrderStatus = 'Pending' | 'Shipped' | 'Delivered' | 'Canceled';

@Entity('ORDERS1')
export class Order {
    @PrimaryGeneratedColumn()
    Order_ID: number;



    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn({ name: 'User_ID' })
    User: User;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    Order_At: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
    Total_Amount: number;

    @Column({
        type: 'enum',
        enum: ['Pending', 'Shipped', 'Delivered', 'Canceled'],
        default: 'Pending',
    })
    Order_Status: OrderStatus;

    @Column()
    User_ID: number;

    @OneToMany(() => CartItem, (cartItem) => cartItem.order)
    cartItems: CartItem[];

    @OneToMany(() => Payment, payment => payment.order)
    payments: Payment[];
}