import { Resolver, Query, Ctx } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { User } from '../../entity/User';
import { Repository } from 'typeorm';
import { Context } from 'src/types/Context';

@Resolver()
export class ViewerResolver {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  @Query(_returns => User, { nullable: true })
  async viewer(@Ctx() ctx: Context): Promise<User | null> {
    const session = ctx.request.session;
    if (session && session.userId) {
      try {
        return this.userRepository.findOneOrFail(session.userId);
      } catch (error) {
        return null;
      }
    } else {
      return null;
    }
  }
}
