import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ObjectType, Field, ID, InputType } from 'type-graphql';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(_type => ID)
  readonly uid: string;

  @Column()
  @Field()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  @Field()
  active: boolean;

  @CreateDateColumn()
  @Field()
  date_joined: Date;

  // @Column('timestamp')
  // @Field()
  // lastLogin: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  customer_id?: string;
}

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  password: string;
}