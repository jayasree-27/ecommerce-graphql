import { Injectable, BadRequestException, NotFoundException, ForbiddenException, forwardRef, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { User, UserRole } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const existing = await this.repo.findOne({ where: { email: dto.email } });
    if (existing) throw new BadRequestException('User already exists');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.repo.create({
      ...dto,
      password: hashedPassword,
      role: dto.role || UserRole.USER
    });

    return this.repo.save(user);
  }

  async loginUser(email: string, password: string) {
    const user = await this.repo.findOne({ where: { email } });
    if (!user) throw new NotFoundException('User not found');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new BadRequestException('Invalid credentials');

    const token = await this.authService.generateToken(user);
    return token.access_token;
  }

  findAll(requestingUser?: User) {
    if (requestingUser?.role !== UserRole.ADMIN)
      throw new ForbiddenException("You don't have permission");
    return this.repo.find();
  }

  async findById(id: number) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
