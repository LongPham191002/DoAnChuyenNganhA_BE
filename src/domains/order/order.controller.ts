import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import {OrdersService} from "./order.service";

@Controller('orders1')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
        return this.ordersService.create(createOrderDto);
    }

    @Get()
    async findAll(): Promise<Order[]> {
        return this.ordersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Order> {
        return this.ordersService.findOne(+id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateOrderDto: CreateOrderDto,
    ): Promise<Order> {
        return this.ordersService.update(+id, updateOrderDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.ordersService.remove(+id);
    }
}
