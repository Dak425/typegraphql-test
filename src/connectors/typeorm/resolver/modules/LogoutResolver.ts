import { Resolver, Mutation, Ctx } from 'type-graphql';
import { Context } from 'src/types/Context';

@Resolver()
export class LogoutResolver {
  @Mutation(_returns => Boolean)
  async logout(@Ctx() ctx: Context): Promise<Boolean> {
    return new Promise((res, rej) => {
      if (ctx.req.session) {
        ctx.req.session.destroy(error => {
          if (error) {
            console.log(error);
            return rej(false);
          } else {
            ctx.res.clearCookie('viewer');
            return res(true);
          }
        });
      } else {
        return rej(false);
      }
    });
  }
}
