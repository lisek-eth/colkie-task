import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomID } from 'src/common/types';
import { RoomEntity } from 'src/entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {
  private readonly logger = new Logger(RoomsService.name);

  constructor(
    @InjectRepository(RoomEntity)
    private roomsRepository: Repository<RoomEntity>,
  ) {}

  async create(name: string): Promise<RoomID> {
    try {
      const newRoom = await this.roomsRepository.save(new RoomEntity(name));

      this.logger.debug(`New room created`);

      return newRoom.id;
    } catch (e: any) {
      this.logger.error(`Unable to create new room entry in database`, e);

      throw e;
    }
  }
}
