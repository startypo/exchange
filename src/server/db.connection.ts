import mongoose from 'mongoose';
import * as redis from 'redis';
import { RedisClient } from 'redis';
import { Config } from './config';

export class DBConnection {

    public static getConnection(): mongoose.Connection {

        if (this.conn)
            return this.conn;

        this.conn = mongoose.createConnection(Config.db.connString, (err) => {

            if (err) {
                console.log(err);
                return;
            }

            console.log('Mongoose: connected at: %s', Config.db.connString);
        });

        return this.conn;
    }

    public static connectToRedis(): void {

        this.redisClient = redis.createClient(Config.redis);
        this.redisClient.on('connect', () => console.log('Redis: Connected at: %s', Config.redis.url));
        this.redisClient.on('error', (err) => console.log('Redis: %s', err));
    }

    public static getRedisClient(): RedisClient {

        if (this.redisClient)
            return this.redisClient;

        this.connectToRedis();
        return this.redisClient;
    }

    private static redisClient: RedisClient;
    private static conn: mongoose.Connection;
}
