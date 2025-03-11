import { createClient, RedisClientType } from 'redis';
import dotenv from 'dotenv';
dotenv.config();


export const client: RedisClientType = createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    password: process.env.REDIS_PASSWORD,
});
export const connRedis = async (): Promise<RedisClientType> => {
    client.on('error', (err) => console.error('Redis Client Error', err));

    try {
        await client.connect();
        console.log('🚀 Redis client connected...........');
        return client;
    } catch (error) {
        console.error('Failed to connect to Redis', error);
        throw error;
    }
};