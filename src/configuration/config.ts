import * as dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config();

const {
  HTTP_PORT,
  DB_TYPE,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  KAFKA_EVENTS_BROKERS,
  INCOMING_MESSAGE,
  OUTGOING_MESSAGE,
  GROUP_ID,
} = process.env;

export default (): any =>
  ({
    API_PREFIX: '/api',
    API_VERSION: '/v1',
    POSTGRES_DB_SETTINGS: {
      type: DB_TYPE,
      host: DB_HOST,
      port: Number(DB_PORT) || 5432,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy(),
    },

    KAFKA: {
      brokers: KAFKA_EVENTS_BROKERS.split(','),
      // ssl: { rejectUnauthorized: false },
      // sasl: {
      //   mechanism: 'plain',
      //   username: process.env.KAFKA_SASL_USERNAME,
      //   password: process.env.KAFKA_SASL_PASSWORD,
      // },
    },
    KAFKA_TOPICS: {
      INCOMING_MESSAGE: INCOMING_MESSAGE,
      OUTGOING_MESSAGE: OUTGOING_MESSAGE,
    },
    GROUP_ID: {
      GROUP_ID: GROUP_ID,
    },
  }) as const;
