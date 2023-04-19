import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomMessageEntity } from 'src/entities/room-message.entity';
import { RoomUserEntity } from 'src/entities/room-user.entity';
import { RoomEntity } from 'src/entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsMessagesService {
  private readonly logger = new Logger(RoomsMessagesService.name);

  constructor(
    @InjectRepository(RoomMessageEntity)
    private roomsMessagesRepository: Repository<RoomMessageEntity>,
  ) {}

  async addMessage(
    room: RoomEntity,
    user: RoomUserEntity,
    message: string,
  ): Promise<void> {
    try {
      await this.roomsMessagesRepository.save(
        new RoomMessageEntity(user, room, message),
      );
    } catch (e: any) {
      this.logger.error(
        `Unable to add a message to a room [roomId: ${room.id}, userId: ${user.id}]`,
        e,
      );

      throw e;
    }
  }

  async getRecent(roomId: string, limit: number): Promise<RoomMessageEntity[]> {
    try {
      return this.roomsMessagesRepository.find({
        where: {
          room: { id: roomId },
        },
        order: {
          createdAt: 'DESC',
        },
        take: limit,
        skip: 0,
        relations: {
          user: true,
        },
      });
    } catch (e: any) {
      this.logger.error(
        `Unable to get recent messages for room id ${roomId}`,
        e,
      );

      throw e;
    }
  }
}
