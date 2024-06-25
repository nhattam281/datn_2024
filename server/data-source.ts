import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { boolean } from 'boolean';
import dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { NamingStrategy } from './src/common/configs/typeorm.config';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

dotenv.config();
export const dbConfig: TypeOrmModuleOptions &
  DataSourceOptions &
  MysqlConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrationsRun: true,
  dropSchema: process.env.NODE_ENV === 'test' ? true : false, // testing
  entities: ['./dist/**/*.entity.js'],
  synchronize: true,
  migrations: ['./dist/migrations/*.js'],
  logging: boolean(process.env.DB_SHOW_SQL),
  logger: 'simple-console',
  migrationsTransactionMode: 'each',
  namingStrategy: new NamingStrategy(),
};

export const appDataSource = new DataSource(dbConfig);
