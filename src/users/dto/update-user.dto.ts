import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class UpdateUserDto {
    @Field(() => Int)
    @IsOptional()
    id?: number;

    @Field({ nullable: true })
    @IsOptional()

    email?: string;

    @Field({ nullable: true })
    @IsOptional()

    password?: string;

    @Field({ nullable: true })
    @IsOptional()

    firstName?: string;

    @Field({ nullable: true })
    @IsOptional()

    lastName?: string;

    @Field({ nullable: true })
    @IsOptional()

    role?: string;
}
