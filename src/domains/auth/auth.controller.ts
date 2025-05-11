// src/auth/auth.controller.ts
import {Controller, Post, Body, UseGuards, Request, Get} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import {AuthService} from "./auth.service";
import {JwtAuthGuard} from "./auth.guard";
import {RolesGuard} from "./roles.guard";
import {Roles} from "./roles.decorator";
import {UserRole} from "../users/entities/user.entity";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UserService} from "../users/users.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,    private readonly userService: UserService,  // Thêm UserService vào constructor
    ) {}

    // Lấy tất cả người dùng khi gọi GET http://localhost:3000/auth
    @Get('')
    async getAll() {
        const users = await this.userService.findAll();
        return users;
    }

    // Route đăng nhập
    @Post('login')
    async login(@Body() createAuthDto: CreateAuthDto) {
        console.log('Login request received with body:', createAuthDto); // Debug log
        return this.authService.login(createAuthDto);
    }
    // Route đăng ký
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    // Route lấy thông tin người dùng khi đã đăng nhập (protected)
    @UseGuards(JwtAuthGuard)
    @Post('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.Admin)
    @Get('admin-only')
    getAdminStuff() {
        return { message: 'This is admin content only' };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.Customer)
    @Get('user-only')
    getUserStuff() {
        return { message: 'This is customer content only' };
    }
}
