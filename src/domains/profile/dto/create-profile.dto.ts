// `DoAnCNA/fashion-store-backend/src/domains/profile/dto/create-profile.dto.ts`
export class CreateProfileDto {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    image_url: string;
    date_time?: Date; // Make it optional
    role?: 'Admin' | 'Customer';
}