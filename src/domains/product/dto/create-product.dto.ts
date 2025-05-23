
export class CreateProductDto {
    product_name?: string;
    description: string;
    size: string;
    color: string;
    image_url?: string;
    status: 'In Stock' | 'Out of Stock';
    product_quantity: number;
    price: number;
    category_id: number
}
