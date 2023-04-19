import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomID, UserID } from 'src/common/types';
import { RoomUserEntity } from 'src/entities/room-user.entity';
import { RoomEntity } from 'src/entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {
  private readonly logger = new Logger(RoomsService.name);

  constructor(
    @InjectRepository(RoomEntity)
    private roomsRepository: Repository<RoomEntity>,
    @InjectRepository(RoomUserEntity)
    private roomsUsersRepository: Repository<RoomUserEntity>,
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

  async get(id: string): Promise<RoomEntity> {
    try {
      return this.roomsRepository.findOneBy({ id });
    } catch (e: any) {
      this.logger.error(`Unable to retreive room data from database`, e);

      throw e;
    }
  }

  async addUser(room: RoomEntity, nickname: string): Promise<UserID> {
    try {
      const newUser = await this.roomsUsersRepository.save(
        new RoomUserEntity(room, nickname),
      );

      this.logger.debug(`New user added to a room`);

      return newUser.id;
    } catch (e: any) {
      this.logger.error(
        `Unable to create new user entry in database for room ${room.id}`,
        e,
      );

      throw e;
    }
  }
}
