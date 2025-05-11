import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {Order} from "../../order/entities/order.entity";

export enum UserRole {
  Admin = 'Admin',
  Customer = 'Customer',
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 20 })
  phone: string;

  @Column('text')
  address: string;

  @Column({ length: 500, nullable: true })
  image_url: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  datetime: Date;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.Customer })
  role: UserRole = UserRole.Customer;

  // Add this line to define the inverse relationship with orders
  @OneToMany(() => Order, (order) => order.User)
  orders: Order[];

  // Nếu bạn dùng xác thực đăng nhập, thêm password:
  @Column({ name: 'Password', nullable: true })
  password: string;
}
