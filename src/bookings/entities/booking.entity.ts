import { BookingStatus } from 'src/constants/constants';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'bookings' })
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  restaurantId: string;

  @Column({ type: 'timestamp without time zone' })
  startTime: Date;

  @Column({ type: 'timestamp without time zone' })
  endTime: Date;

  @Column({ type: 'int' })
  guests: number;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.CREATED,
  })
  status: BookingStatus;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt: Date;
}
