import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Profile} from "./entities/profile.entity";
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile)
        private profileRepo: Repository<Profile>,
    ) {}

    create(dto: CreateProfileDto) {
        const profile = this.profileRepo.create();
        return this.profileRepo.save(profile);
    }

    findAll() {
        return this.profileRepo.find();
    }

    findOne(id: number) {
        return this.profileRepo.findOneBy({ id });
    }

    update(id: number, dto: UpdateProfileDto) {
        return this.profileRepo.update(id, dto);
    }

    remove(id: number) {
        return this.profileRepo.delete(id);
    }
}
