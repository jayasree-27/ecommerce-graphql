import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) { }

    @Mutation(() => User)
    async register(@Args('input') input: CreateUserDto) {
        return this.usersService.createUser(input);
    }

    @Mutation(() => String)
    async login(@Args('email') email: string, @Args('password') password: string) {
        return this.usersService.loginUser(email, password);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [User])
    async users(@Context() context: any) { // remove 'user'
        const jwtUser = context.req.user;   // this will be defined by GqlAuthGuard
        if (!jwtUser) {
            throw new Error('Unauthorized');
        }

        const user = {
            id: jwtUser.userId,
            email: jwtUser.email,
            role: jwtUser.role
        } as User;

        return this.usersService.findAll(user);
    }


}
