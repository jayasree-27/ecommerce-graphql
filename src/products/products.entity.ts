import { Column,CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/users.entity";
import { Field, Float, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity('products')
export class Product{
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!:number;

    @Field()
    @Column({
        type:'varchar',
        length:255,
        nullable:false
    })
    name!:string;

    @Field({nullable:true})
    @Column({
        type:'text',
        nullable:true
    })
    description?:string;

    @Field(() => Float)
    @Column({
        type:'decimal',
        nullable:false
    })
    price!:number;

    @Field(() => Int)
    @Column({
        type:'integer',
        default:0
    })
    stock_quantity!:number;

    @Field()
    @CreateDateColumn({
        type:'timestamp'
    })
    createdAt!:Date;

    @Field()
    @CreateDateColumn({
        type:'timestamp'
    })
    updatedAt!:Date;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.products,{eager:true} )
    @JoinColumn({name:'owner_id'})
    owner!:User;
}