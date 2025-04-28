import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethod } from './entities/payment-method.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentMethodService {
  constructor(
      @InjectRepository(PaymentMethod)
      private paymentMethodRepository: Repository<PaymentMethod>,
  ) {}

  create(data: Partial<PaymentMethod>) {
    const paymentMethod = this.paymentMethodRepository.create(data);
    return this.paymentMethodRepository.save(paymentMethod);
  }

  findAll() {
    return this.paymentMethodRepository.find();
  }

  findOne(id: number) {
    return this.paymentMethodRepository.findOneBy({ id });
  }

  update(id: number, data: Partial<PaymentMethod>) {
    return this.paymentMethodRepository.update(id, data);
  }

  remove(id: number) {
    return this.paymentMethodRepository.delete(id);
  }
}
