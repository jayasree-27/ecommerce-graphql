import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateProductDto {
    @Field()
    name?: string;

    @Field({ nullable: true })
    description?: string;

    @Field(() => Int)
    price?: number;

    @Field(() => Int, { nullable: true })
    stock_quantity?: number;

}