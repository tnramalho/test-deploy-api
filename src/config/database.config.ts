import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Logger } from '@nestjs/common';
import { User } from '../users/entities/user.entity';

export const DATABASE_CONFIG_KEY = 'database';

export interface DatabaseConfigInterface {
  url: string;
  type: 'postgres';
  entities: any[];
  synchronize: boolean;
  ssl: boolean | { rejectUnauthorized: boolean };
}

export const databaseConfig = registerAs(
  DATABASE_CONFIG_KEY,
  (): DatabaseConfigInterface => {
    const url = process.env.DATABASE_URL;
    const isProduction = process.env.NODE_ENV === 'production';

    if (!url && isProduction) {
      throw new Error('DATABASE_URL must be set in production environment');
    }

    if (!url) {
      Logger.warn(
        'No DATABASE_URL was provided. Using default local development URL.',
      );
    }

    return {
      url: url || 'postgresql://postgres:postgres@localhost:5432/my_nestjs_db',
      type: 'postgres',
      entities: [User],
      synchronize: true,
      ssl: isProduction ? { rejectUnauthorized: false } : false,
    };
  },
); 