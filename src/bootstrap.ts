import 'reflect-metadata';
import { buildSchema, useContainer } from 'type-graphql';
import { Container } from 'typedi';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import cors from 'cors';
import session from 'express-session';
import { setupTypeORM } from './connectors/typeorm';
import { resolvers as TypeORMResolvers } from './connectors/typeorm/resolver';

export async function bootstrap() {
  await setupTypeORM();

  useContainer(Container);

  const schema = await buildSchema({
    resolvers: [...TypeORMResolvers],
  });

  const app = Express();

  app.use(
    cors({
      origin: 'http://localhost:4200',
      credentials: true,
    })
  );

  app.use(
    session({
      name: 'viewer',
      secret: 'sd9fu0awkernk',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
      },
    })
  );

  const server = new ApolloServer({
    schema,
    playground: true,
    context: ({ req, res }: any) => ({ req, res }),
  });

  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log(`API server started, GraphQL Playground available at /graphql`);
  });
}
