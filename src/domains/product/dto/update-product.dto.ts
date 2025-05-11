import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    id: string;
    product_name: string;
    description?: string;
    size?: string;
    color?: string;
    image_url?: string;
    status: 'In Stock' | 'Out of Stock';
    product_quantity: number;
    price: number;
    category_id?: number;

}
