import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import {Product} from "../../product/entities/product.entity";
import {Order} from "../../order/entities/order.entity";


@Entity('CART_ITEM1')
export class CartItem {
    @PrimaryGeneratedColumn({ name: 'Cart_Item_Id' })
    cartItemId: number;

    @ManyToOne(() => Order, (order) => order.cartItems, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'Order_ID' })
    order: Order;

    @ManyToOne(() => Product, (product) => product.cartItems, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'Product_ID' })
    product: Product;

    @Column({ name: 'Cart_Item_Quantity' })
    quantity: number;

    @Column({ name: 'Price_At_Purchase', type: 'decimal', precision: 10, scale: 2 })
    priceAtPurchase: number;
}
