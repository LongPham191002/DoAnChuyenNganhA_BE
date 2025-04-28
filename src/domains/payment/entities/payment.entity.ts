import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PaymentMethod } from '../../payment-method/entities/payment-method.entity';
import {Order} from "../../order/entities/order.entity";

@Entity('payment1')
export class Payment {
    @PrimaryGeneratedColumn({ name: 'Payment_ID' })
    id: number;

    @ManyToOne(() => Order, order => order.payments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'Order_ID' })
    order: Order;

    @ManyToOne(() => PaymentMethod, paymentMethod => paymentMethod.payments, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'Payment_Method_ID' })
    paymentMethod: PaymentMethod;

    @Column({
        name: 'Payment_Status',
        type: 'enum',
        enum: ['Unpaid', 'Paid'],
        default: 'Unpaid'
    })
    paymentStatus: 'Unpaid' | 'Paid';

    @Column({ name: 'Payment_At', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    paymentAt: Date;
}
