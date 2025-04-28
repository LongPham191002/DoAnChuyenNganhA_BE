import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {OrdersService} from "./order.service";
import {OrdersController} from "./order.controller";
import {Order} from "./entities/order.entity";



@Module({
    imports: [TypeOrmModule.forFeature([Order])],
    providers: [OrdersService],
    controllers: [OrdersController],
    exports: [TypeOrmModule],
})
export class OrdersModule {}
