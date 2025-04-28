import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Payment} from "./entities/payment.entity";
import {Repository} from "typeorm";
import {PaymentMethod} from "../payment-method/entities/payment-method.entity";
import {Order} from "../order/entities/order.entity";
import {CreatePaymentDto} from "./dto/create-payment.dto";

@Injectable()
export class PaymentService {
  constructor(
      @InjectRepository(Payment)
      private paymentRepository: Repository<Payment>,
      @InjectRepository(PaymentMethod)
      private paymentMethodRepository: Repository<PaymentMethod>,
      @InjectRepository(Order)
      private orderRepository: Repository<Order>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const { orderId, paymentMethodId, paymentStatus } = createPaymentDto;

    // Lấy thông tin Order từ cơ sở dữ liệu
    const order = await this.orderRepository.findOne({ where: { Order_ID:orderId } });
    if (!order) {
      throw new Error('Order not found');
    }

    // Lấy thông tin PaymentMethod từ cơ sở dữ liệu
    const paymentMethod = await this.paymentMethodRepository.findOne({ where: { id: paymentMethodId } }); // Chỉnh sửa ở đây
    if (!paymentMethod) {
      throw new Error('Payment Method not found');
    }

    // Tạo đối tượng Payment mới với thời gian thực hiện tại
    const payment = this.paymentRepository.create({
      order,
      paymentMethod,
      paymentStatus: paymentStatus || 'Unpaid',
      paymentAt: new Date(), // Gán thời gian hiện tại
    });

    // Lưu vào cơ sở dữ liệu
    return this.paymentRepository.save(payment);
  }  async findAll() {
    return this.paymentRepository.find();
  }

  async findOne(id: number) {
    return this.paymentRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePaymentDto: CreatePaymentDto) {
    const payment = await this.paymentRepository.findOne({ where: { id } });
    if (!payment) {
      throw new Error('Payment not found');
    }

    // Cập nhật payment
    Object.assign(payment, updatePaymentDto);
    return this.paymentRepository.save(payment);
  }

  async remove(id: number) {
    const payment = await this.paymentRepository.findOne({ where: { id } });
    if (!payment) {
      throw new Error('Payment not found');
    }

    return this.paymentRepository.remove(payment);
  }
}
