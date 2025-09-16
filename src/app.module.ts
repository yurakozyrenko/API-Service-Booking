import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { BookingsModule } from './bookings/bookings.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './configuration/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => configService.getOrThrow('POSTGRES_DB_SETTINGS'),
      inject: [ConfigService],
    }),
    BookingsModule,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().exclude('health').forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
