import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { ClientKafka } from '@nestjs/microservices';
import { BookingStatus } from 'src/constants/constants';
import { lastValueFrom } from 'rxjs';
import { BookingsRepository } from './booking.repository';

@Injectable()
export class BookingsService {
  private readonly logger = new Logger(BookingsService.name);
  constructor(
    private bookingsRepository: BookingsRepository,

    @Inject('KAFKA_PRODUCER')
    private readonly kafkaClient: ClientKafka,
  ) {}

  async createBooking(createBookingDto: CreateBookingDto): Promise<Booking> {
    this.logger.log(`Trying to create booking`, createBookingDto);

    const { raw } = await this.bookingsRepository.createBooking({
      ...createBookingDto,
      status: BookingStatus.CREATED,
    });

    this.logger.log(`Prepare send kafka with id: ${raw[0].id}`);

    await lastValueFrom(
      this.kafkaClient.emit('booking.created', {
        ...createBookingDto,
        status: BookingStatus.CREATED,
        bookingId: raw[0].id,
      }),
    );
    this.logger.debug(`booking successfully created with id: ${raw[0].id}`);
    return raw[0];
  }

  async findOneBooking(id: string): Promise<Booking> {
    this.logger.log(`Trying to booking by id: ${id}`);

    const booking = await this.bookingsRepository.findOneById(id);

    if (!booking) {
      this.logger.error(`booking with id: ${id} not found`);
      throw new HttpException(`boooking with id: ${id} not found`, HttpStatus.NOT_FOUND);
    }
    this.logger.debug(`booking successfully get with id: ${id}`);
    return booking;
  }
}
