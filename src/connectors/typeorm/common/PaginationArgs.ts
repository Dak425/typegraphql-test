import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class PaginationArgs {
  @Field(_type => Int)
  skip: number = 0;

  @Field(_type => Int)
  take: number = 25;
}
