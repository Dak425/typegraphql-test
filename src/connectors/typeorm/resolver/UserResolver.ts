import { Resolver, Query, Mutation, Arg, Args } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { hash } from 'argon2';

import { User, UserInput } from '../entity/User';
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

  @Mutation(_returns => User)
  async addUser(@Arg('user') user: UserInput): Promise<User> {
    const pwHash = await hash(user.password);
    return this.userRepository.save({
      ...user,
      password: pwHash,
    });
  }
}
