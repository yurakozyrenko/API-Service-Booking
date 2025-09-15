import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingsRepository } from './booking.repository';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingsService {
  private readonly logger = new Logger(BookingsService.name);
  constructor(private bookingsRepository: BookingsRepository) {}

  async create(createBookingDto: CreateBookingDto) {
    const { raw } = await this.bookingsRepository.createBooking(createBookingDto);

    this.logger.debug(`admin successfully created with id: ${raw[0].id}`);
  }

  async findOne(id: Booking['id']): Promise<Booking> {
    const booking = await this.bookingsRepository.findOneById(id);

    if (!booking) {
      this.logger.error(`booking with id: ${id} not found`);
      throw new HttpException(`booking with id: ${id} not found`, HttpStatus.NOT_FOUND);
    }

    return booking;
  }
}
