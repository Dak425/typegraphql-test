import { Resolver, Query, Arg, Args } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';

import { User } from '../entity/User';
import { PaginationArgs } from '../common/PaginationArgs';

@Resolver(User)
export class UserResolver {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  @Query(_returns => User)
  userInfo(@Arg('uid') uid: string): Promise<User> {
    return this.userRepository.findOneOrFail(uid);
  }

  @Query(_returns => [User])
  users(@Args() { skip, take }: PaginationArgs): Promise<User[]> {
    return this.userRepository.find({
      skip,
      take,
    });
  }
}
