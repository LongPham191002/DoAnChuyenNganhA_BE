import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Payment} from '../../payment/entities/payment.entity';

@Entity('payment_method')
export class PaymentMethod {
    @PrimaryGeneratedColumn({ name: 'Payment_Method_ID' })
    id: number;

    @Column({ name: 'Method_Name' })
    methodName: string;

    @OneToMany(() => Payment, payment => payment.paymentMethod)
    payments: Payment[];
}
