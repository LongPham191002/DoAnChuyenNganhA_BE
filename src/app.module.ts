import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './domains/users/users.module';
import { ProductModule } from './domains/product/product.module';
import { ProfileModule } from './domains/profile/profile.module';
import {CategoryModule} from "./domains/category/category.module";
import {OrdersModule} from "./domains/order/order.module";
import {CartItemModule} from "./domains/cart-item/cart-item.module";
import {PaymentModule} from "./domains/payment/payment.module";
import {PaymentMethodModule} from "./domains/payment-method/payment-method.module";
import {AuthModule} from "./domains/auth/auth.module";
import {RolesGuard} from "./domains/auth/roles.guard";
import {APP_GUARD} from "@nestjs/core";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '04052002',
      database: 'shopthoitrang_db',
      autoLoadEntities: true,
      synchronize: false, // true cho dev, false cho production
    }),
    UsersModule,
    ProductModule,
    ProfileModule,
    CategoryModule,
    OrdersModule,
    CartItemModule,
    PaymentModule,
    PaymentMethodModule,
      AuthModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {

}