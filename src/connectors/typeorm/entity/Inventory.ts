import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { ObjectType, Field, ID, InputType, Int } from 'type-graphql';
import { Image } from './Image';

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

  @ManyToMany(_type => Image)
  @JoinTable()
  @Field(_type => [Image], { nullable: true })
  images: Image[];
}

@InputType()
export class InventoryInput implements Partial<Inventory> {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(_type => Int, { nullable: true })
  stock?: number;

  // @Field(_type => [Image], { nullable: true })
  // images: Image[];
}
