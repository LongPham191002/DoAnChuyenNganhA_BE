export class UpdatePaymentDto {
    paymentMethodId?: number;
    paymentStatus?: 'Unpaid' | 'Paid';
}