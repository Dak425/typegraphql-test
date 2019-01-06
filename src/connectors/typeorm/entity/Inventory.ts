import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID, InputType, Int } from 'type-graphql';

@Entity()
@ObjectType()
export class Inventory {
    @PrimaryGeneratedColumn('uuid')
    @Field(_type => ID)
    readonly uid: string;

    @Column()
    @Field()
    name: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    description?: string;

    @Column({ default: 0 })
    @Field(_type => Int)
    stock: number;

    @Column({ type: 'simple-array', nullable: true })
    @Field(_type => [String], { nullable: true })
    images: string[];
}

@InputType()
export class InventoryInput implements Partial<Inventory> {
    @Field()
    name: string;

    @Field({ nullable: true })
    description?: string;

    @Field(_type => Int)
    stock: number;

    @Field(_type => [String], { nullable: true })
    images?: string[];
}
