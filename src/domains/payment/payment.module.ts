import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Payment} from "./entities/payment.entity";
import {OrdersModule} from "../order/order.module";
import {PaymentMethod} from "../payment-method/entities/payment-method.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, PaymentMethod]),
    OrdersModule, // Import OrdersModule here
  ],
  providers: [PaymentService],
    controllers: [PaymentController],
  exports: [PaymentService],
})
export class PaymentModule {}
