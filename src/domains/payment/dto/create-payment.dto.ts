
export class CreatePaymentDto {
     orderId: number;
     paymentMethodId: number;
     paymentStatus: 'Unpaid' | 'Paid';

}


