import { Resolver,Query,Mutation,Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService:UsersService){}
    

    @Query(() => [User])
    findAllUsers(){
        return this.usersService.findAll();
    }

    @Mutation(() =>User)
    createUser(@Args('createUserDto') dto:CreateUserDto){
        return this.usersService.createUser(dto);
    }
}
