import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { hash } from 'argon2';

import { User, UserInput } from '../entity/User';

@Resolver(User)
export class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) { }

  @Query(_returns => [User])
  users(): Promise<User[]> {
    return this.userRepository.find();
  }

  @Mutation(_returns => User)
  async addUser(@Arg("user") user: UserInput): Promise<User> {
    const pwHash = await hash(user.password);
    return this.userRepository.save({
      ...user,
      password: pwHash
    });
  }
}