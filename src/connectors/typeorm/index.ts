import { getConnectionOptions, createConnection, useContainer } from 'typeorm';
import { Container } from 'typedi';

useContainer(Container);

export const setupTypeORM = async () => {
    let retries = 5;
    while (retries) {
        try {
            const config = await getConnectionOptions(process.env.NODE_ENV || 'development');
            return createConnection({
              ...config,
              name: 'default'
            });
        } catch (error) {
            console.error(error);
            retries -= 1;
            console.log(`Retry attempts remaining: ${retries}`);
            await new Promise(res => setTimeout(res, 5000));
        }
    }

    return null;
};
