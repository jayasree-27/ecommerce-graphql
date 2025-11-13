import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './products.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
@Resolver(() => Product)
export class ProductsResolver {
    constructor(
        private readonly productsService: ProductsService,
        private readonly usersService: UsersService,
    ) { }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Product)
    async createProduct(
        @Args('input') input: CreateProductDto,
        @Context('req') context: any
    ) {
        const jwtUser = context.user;

        if (!jwtUser) throw new Error('Unauthorized');


        const user = {
            id: jwtUser.userId,
            email: jwtUser.email,
            role: jwtUser.role,
        } as User;

        return this.productsService.createProduct(input, user);
    }


    @Query(() => [Product])
    async products(@Context() context: any) {
        return this.productsService.findAll();
    }
}
