import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,OneToMany, UpdateDateColumn } from "typeorm";
import { ObjectType, Field, registerEnumType, ID } from "@nestjs/graphql";
import { Product } from '../products/products.entity';


export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}

registerEnumType(UserRole, {
    name: 'UserRole', // GraphQL enum name
});


@ObjectType()
@Entity()
export class User {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Field()
    @Column()
    firstName!: string;

    @Field()
    @Column()
    lastName!: string;

    @Field(() => UserRole)
    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER
    })
    role!: UserRole;

    @Field()
    @CreateDateColumn({
        type: 'timestamp'
    })
    createdAt!: Date;

    @Field()
    @UpdateDateColumn({
        type: 'timestamp'
    })
    updatedAt!: Date;

    @OneToMany(() => Product, (product) => product.owner)
    products?: Product[] ;
}

