// `DoAnCNA/fashion-store-backend/src/domains/profile/entities/profile.entity.ts`
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: "" })
    name: string;

    @Column()
    email: string;

    @Column({ nullable: true })
    phone?: string;

    @Column({ nullable: true })
    address?: string;

    @Column({ nullable: true })
    image_url?: string;

    @Column({ type: 'enum', enum: ['Admin', 'Customer'], nullable: true })
    role?: 'Admin' | 'Customer';

    // @Column({ default: true })
    // isActive: boolean; // Add this property
}