import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Order} from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto'; // DTO để tạo đơn hàng

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
    ) {}

    // Trong service tạo đơn hàng
    async create(createOrderDto: CreateOrderDto): Promise<Order> {
        // Kiểm tra xem `Total_Amount` đã được cung cấp chưa, nếu chưa, gán giá trị mặc định
        if (!createOrderDto.Total_Amount) {
            createOrderDto.Total_Amount = 0.00; // Hoặc giá trị mặc định nào đó
        }
        if (!createOrderDto.User_ID) {
            throw new Error('User ID is required');
        }

        const order = this.ordersRepository.create(createOrderDto);
        return this.ordersRepository.save(order);
    }


    // Lấy tất cả đơn hàng
    async findAll(): Promise<Order[]> {
        return this.ordersRepository.find();
    }

    async findOne(Order_ID: number): Promise<Order> {
        const order = await this.ordersRepository.findOne({ where: { Order_ID } });
        if (!order) {
            throw new Error(`Order with ID ${Order_ID} not found`);
        }
        return order;
    }

    async update(Order_ID: number, updateOrderDto: CreateOrderDto): Promise<Order> {
        await this.ordersRepository.update(Order_ID, updateOrderDto);
        const updatedOrder = await this.ordersRepository.findOne({ where: { Order_ID } });
        if (!updatedOrder) {
            throw new Error(`Order with ID ${Order_ID} not found`);
        }
        return updatedOrder;
    }

    // Xóa đơn hàng
    async remove(id: number): Promise<void> {
        await this.ordersRepository.delete(id);
    }
}
