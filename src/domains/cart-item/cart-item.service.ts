import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import {CartItem} from "./entities/cart-item.entity";
import {Order} from "../order/entities/order.entity";
import {Product} from "../product/entities/product.entity";

@Injectable()
export class CartItemService {
  constructor(
      @InjectRepository(CartItem)
      private cartItemRepository: Repository<CartItem>,
      @InjectRepository(Order)
      private orderRepository: Repository<Order>,
      @InjectRepository(Product)
      private productRepository: Repository<Product>,
  ) {}

  async create(createCartItemDto: CreateCartItemDto) {
    const order = await this.orderRepository.findOneBy({ Order_ID: createCartItemDto.orderId });
    const product = await this.productRepository.findOneBy({ product_id: createCartItemDto.productId });

    if (!order || !product) {
      throw new NotFoundException('Order or Product not found');
    }

    const cartItem = this.cartItemRepository.create({
      order,
      product,
      quantity: createCartItemDto.quantity,
      priceAtPurchase: createCartItemDto.priceAtPurchase,
    });

    return this.cartItemRepository.save(cartItem);
  }

  findAll() {
    return this.cartItemRepository.find({ relations: ['order', 'product'] });
  }

  findOne(id: number) {
    return this.cartItemRepository.findOne({ where: { cartItemId: id }, relations: ['order', 'product'] });
  }

  async update(id: number, updateCartItemDto: UpdateCartItemDto) {
    const cartItem = await this.cartItemRepository.findOne({ where: { cartItemId: id } });
    if (!cartItem) {
      throw new NotFoundException('CartItem not found');
    }

    Object.assign(cartItem, updateCartItemDto);
    return this.cartItemRepository.save(cartItem);
  }

  async remove(id: number) {
    const cartItem = await this.cartItemRepository.findOne({ where: { cartItemId: id } });
    if (!cartItem) {
      throw new NotFoundException('CartItem not found');
    }

    return this.cartItemRepository.remove(cartItem);
  }
}
