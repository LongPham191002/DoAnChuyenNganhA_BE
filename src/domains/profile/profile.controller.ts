import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from './entities/profile.entity';
import {CreateProfileDto} from "./dto/create-profile.dto";

@Controller('profiles')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Post()
    create(@Body() profile: CreateProfileDto) {
        return this.profileService.create(profile);
    }

    @Get()
    findAll() {
        return this.profileService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.profileService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() profile: Profile) {
        return this.profileService.update(id, profile);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.profileService.remove(id);
    }
}
