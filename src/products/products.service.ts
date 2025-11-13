import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './products.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { User } from '../users/users.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {}

  async createProduct(createProductDto: CreateProductDto, user: User): Promise<Product> {
    const product = this.repo.create({
      ...createProductDto,
      owner: user, // set owner from JWT token
    });

    return this.repo.save(product);
  }

  async findAll() {
    // optional: allow only admin to see all products or for simplicity return all
    return this.repo.find();
  }

  async findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async updateStock(productId: number, quantity: number) {
    const product = await this.findById(productId);
    if (!product) throw new ForbiddenException('Product not found');
    product.stock_quantity = quantity;
    return this.repo.save(product);
  }
}
