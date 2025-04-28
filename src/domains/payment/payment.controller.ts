import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {PaymentService} from "./payment.service";
import {CreatePaymentDto} from "./dto/create-payment.dto";

@Controller('payment1')  // Đảm bảo rằng đường dẫn này trùng với đường dẫn bạn đang gửi yêu cầu POST
export class PaymentController {
  constructor(private readonly service: PaymentService) {}

  @Post() // Đây là phương thức POST để tạo mới
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.service.create(createPaymentDto); // Gọi service để xử lý logic
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() createPaymentDto: CreatePaymentDto) {
    return this.service.update(+id, createPaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
