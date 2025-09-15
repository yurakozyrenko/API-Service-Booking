import { Module } from '@nestjs/common';
import { BookingsModule } from './bookings/bookings.module';
import { ConfigModule } from '@nestjs/config';
import config from './configuration/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),

    BookingsModule,
  ],
  providers: [],
})
export class AppModule {}
