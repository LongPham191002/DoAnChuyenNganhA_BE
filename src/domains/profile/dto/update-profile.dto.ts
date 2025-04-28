// `DoAnCNA/fashion-store-backend/src/domains/profile/dto/update-profile.dto.ts`
import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
    isActive?: boolean;
}