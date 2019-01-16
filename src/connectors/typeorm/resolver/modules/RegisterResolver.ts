import { Resolver, Mutation, Arg } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { hash } from 'argon2';
import { User, UserInput } from '../../entity/User';

@Resolver()
export class RegisterResolver {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  @Mutation(_returns => User, { nullable: true })
  async register(@Arg('user') user: UserInput): Promise<User | null> {
    const existingUser = await this.userRepository.findOne({ email: user.email });
    if (existingUser) {
      return null;
    } else {
      const pwHash = await hash(user.password);
      return this.userRepository.save({
        ...user,
        password: pwHash,
      });
    }
  }
}
