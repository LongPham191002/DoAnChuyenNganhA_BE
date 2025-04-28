
export class CreateOrderDto {
    User_ID: number;
    Total_Amount: number;
    Order_Status: 'Pending' | 'Shipped' | 'Delivered' | 'Canceled';
}
