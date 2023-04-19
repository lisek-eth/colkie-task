import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { RoomEntity } from './room.entity';

@Entity('rooms_users')
export class RoomUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => RoomEntity, (room) => room.id)
  @JoinColumn({ name: 'room_id' })
  public room!: RoomEntity;

  @Column()
  nickname: string;

  constructor(room: RoomEntity, nickname: string) {
    this.id = uuid();
    this.room = room;
    this.nickname = nickname;
  }
}
