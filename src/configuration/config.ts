import * as dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config();

const {
  HTTP_PORT,
  LOG_LEVEL,
  DB_TYPE,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  KAFKA_EVENTS_BROKERS,
  GROUP_ID,
} = process.env;

export default (): any =>
  ({
    HTTP_PORT: Number(HTTP_PORT) || 8000,
    LOG_LEVEL: LOG_LEVEL,
    POSTGRES_DB_SETTINGS: {
      type: DB_TYPE,
      host: DB_HOST,
      port: Number(DB_PORT) || 5432,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy(),
      KAFKA: {
        brokers: (KAFKA_EVENTS_BROKERS || 'localhost:9092').split(','),
      },
      GROUP_ID: {
        GROUP_ID: GROUP_ID,
      },
    },
  }) as const;
