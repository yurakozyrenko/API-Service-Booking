import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { ClientKafka } from '@nestjs/microservices';
import { BookingStatus } from 'src/constants/constants';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly repo: Repository<Booking>,

    @Inject('KAFKA_PRODUCER')
    private readonly kafkaClient: ClientKafka,
  ) {}

  async create(dto: CreateBookingDto): Promise<Booking> {
    const b = this.repo.create({
      restaurantId: dto.restaurantId,
      startTime: new Date(dto.startTime),
      endTime: new Date(dto.endTime),
      guests: dto.guests,
      status: BookingStatus.CREATED,
    });
    const saved = await this.repo.save(b);

    await lastValueFrom(
      this.kafkaClient.emit('booking.created', {
        bookingId: saved.id,
        restaurantId: saved.restaurantId,
        startTime: saved.startTime.toISOString(),
        endTime: saved.endTime.toISOString(),
        guests: saved.guests,
        status: 'CREATED', 
        timestamp: new Date().toISOString(), 
      }),
    );

    return saved;
  }

  async findOne(id: string): Promise<Booking | null> {
    return this.repo.findOne({ where: { id } });
  }
}
