import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from "./users.entity";
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private repo: Repository<User>) { }

    async createUser(dto: CreateUserDto): Promise<User> {
        const hashed = await bcrypt.hash(dto.password, 12);
        const user = this.repo.create({
            name: dto.name,
            email: dto.email,
            password: hashed
        });
        return this.repo.save(user);
    }

    findAll():Promise<User[]>{
        return this.repo.find();
    }
}

