import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, InputType } from 'type-graphql';

@Entity()
@ObjectType()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  readonly uid: string;

  @Column()
  @Field()
  url: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  path?: string;

  parseFirebaseImageURL(url: string) {
    const strArray = url.split('/');
    console.log(strArray);
  }
}

@InputType()
export class ImageInput implements Partial<Image> {
  @Field()
  url: string;
}
