// src/auth/auth.service.ts
import {Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';
// import * as bcrypt from 'bcryptjs';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {User, UserRole} from "../users/entities/user.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    // Phương thức lấy tất cả người dùng
    async getAllUsers() {
        return await this.userRepository.find(); // Lấy tất cả người dùng từ cơ sở dữ liệu
    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findOneByEmail(email);
        console.log('User found:', user);  // Kiểm tra xem người dùng đã được tìm thấy đúng chưa

            if (user && user.password === password) {
                const { password, ...result } = user;
                return result;
            }
        return null;
    }


    async register(createUserDto: CreateUserDto) {
        // Exclude the id property to avoid type mismatch
        const newUser = await this.userService.create({
            ...createUserDto,
            password: createUserDto.password,
            role: UserRole.Customer, // Ensure using enum UserRole
        });
        const payload = { email: newUser.email, sub: newUser.id };
        return {
            access_token: this.jwtService.sign(payload),
            user: newUser,
        };
    }


    // Đăng nhập và tạo JWT
    async login(createAuthDto: CreateAuthDto) {

        console.log('Attempting to validate user with email:', createAuthDto.email);  // Log email
        const user = await this.validateUser(createAuthDto.email, createAuthDto.password);
        if (!user) {
            console.error('Invalid credentials for email:', createAuthDto.email); // Log khi không tìm thấy người dùng
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { email: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user,
        };

    }
}
