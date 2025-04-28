import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { CartItem } from './entities/cart-item.entity';
import { Order } from '../order/entities/order.entity';
import { Product } from '../product/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartItem, Order, Product]), // Register entities
  ],
  controllers: [CartItemController],
  providers: [CartItemService],
  exports: [CartItemService], // Export if used in other modules
})
export class CartItemModule {}