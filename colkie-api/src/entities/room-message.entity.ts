import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { RoomEntity } from './room.entity';
import { RoomUserEntity } from './room-user.entity';

@Entity('rooms_messages')
export class RoomMessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => RoomEntity, (room) => room.id)
  @JoinColumn({ name: 'room_id' })
  public room!: RoomEntity;

  @ManyToOne(() => RoomUserEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  public user!: RoomUserEntity;

  @Column()
  message: string;

  @Column()
  createdAt: Date;

  constructor(user: RoomUserEntity, room: RoomEntity, message: string) {
    this.id = uuid();
    this.user = user;
    this.room = room;
    this.message = message;
    this.createdAt = new Date();
  }
}
