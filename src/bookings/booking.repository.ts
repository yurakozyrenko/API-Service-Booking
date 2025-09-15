import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsRepository {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingsRepository: Repository<Booking>,
  ) {}

  async findOneById(id: string): Promise<Booking | null> {
    return await this.bookingsRepository.createQueryBuilder('bookings').where('bookings.id = :id', { id }).getOne();
  }

  async createBooking(createBookingDto: CreateBookingDto): Promise<InsertResult> {
    return await this.bookingsRepository
      .createQueryBuilder('bookings')
      .insert()
      .into(Booking)
      .values(createBookingDto)
      .execute();
  }
}
