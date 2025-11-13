import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, IsEnum, IsIn, IsNotEmpty, MinLength } from "class-validator";
import {  UserRole } from "../users.entity";
@InputType()
export class CreateUserDto {
    @Field()
    @IsEmail()
    email!: string;

    @Field()
    @MinLength(6)
    password!: string

    @Field()
    @IsNotEmpty()
    firstName!: string;

    @Field()
    @IsNotEmpty()

    lastName!: string;

    @Field(() => UserRole,{
        nullable: true
    })
    @IsEnum(UserRole)
    role?: UserRole;

}