import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get<string>('STRIPE_API_KEY'), {
      apiVersion: '2022-11-15',
    });
  }

  async createPaymentIntent(createPaymentDto: any) {
    const { amount, currency } = createPaymentDto;

    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,    // Monto en centavos o la unidad menor
        currency,  // Moneda como 'usd' o 'eur'
      });

      return {
        clientSecret: paymentIntent.client_secret, // Token para el frontend
        id: paymentIntent.id,                     // ID del intento de pago
        status: paymentIntent.status,             // Estado del intento de pago
      };
    } catch (error) {
      throw new Error(`Failed to create payment intent: ${error.message}`);
    }
  }
}
