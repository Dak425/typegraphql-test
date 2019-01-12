import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { verify } from 'argon2';
import { User } from '../../entity/User';
import { Repository } from 'typeorm';
import { Context } from 'src/types/Context';

@Resolver()
export class LoginResolver {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  @Mutation(_returns => User, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    try {
      const user = await this.userRepository.findOneOrFail({ where: { email } });
      const success = await verify(user.password, password);
      if (success && ctx.req.session) {
        ctx.req.session.userId = user.uid;
        return user;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }
}
