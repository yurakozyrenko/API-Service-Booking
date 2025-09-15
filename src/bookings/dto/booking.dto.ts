import { IsDateString, IsInt, IsOptional, IsString, Length, Min } from 'class-validator';
import { Booking } from '../entities/booking.entity';

export class BookingDto {
  @IsString()
  @Length(5, 36)
  restaurantId: Booking['restaurantId'];

  @IsDateString()
  startTime: Booking['startTime'];

  @IsDateString()
  endTime: Booking['endTime'];

  @IsInt()
  @Min(1)
  guests: Booking['guests'];

  @IsOptional()
  status: Booking['status'];
}
