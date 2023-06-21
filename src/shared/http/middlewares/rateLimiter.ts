import { Request, Response, NextFunction } from 'express';
import redis from 'redis';
//import Redis from 'ioredis'; v4 redis
import { RateLimiterRedis } from 'rate-limiter-flexible';
import AppError from '@shared/errors/AppError';

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    // const redisClient = new Redis({ v4 redis
    const redisClient = redis.createClient({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASS,
    });

    const limiter = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: 'ratelimit',
      points: 5, //quantidade de requisições por ip em x (duration)
      duration: 1, //second
    });

    await limiter.consume(request.ip);
    return next();
  } catch (err) {
    throw new AppError('Too many request.', 429);
  }
}
