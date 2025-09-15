import { PickType } from '@nestjs/mapped-types';
import { BookingDto } from './booking.dto';

export class CreateBookingDto extends PickType(BookingDto, [
  'restaurantId',
  'startTime',
  'endTime',
  'guests',
  'status',
]) {}
