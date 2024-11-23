import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './create-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-payment-intent')
  async createPaymentIntent(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.createPaymentIntent(createPaymentDto);
  }
}
