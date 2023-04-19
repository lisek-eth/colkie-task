import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserID } from 'src/common/types';
import { RoomUserEntity } from 'src/entities/room-user.entity';
import { RoomEntity } from 'src/entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsUsersService {
  private readonly logger = new Logger(RoomsUsersService.name);

  constructor(
    @InjectRepository(RoomUserEntity)
    private roomsUsersRepository: Repository<RoomUserEntity>,
  ) {}

  async get(id: string): Promise<RoomUserEntity> {
    try {
      return this.roomsUsersRepository.findOneBy({ id });
    } catch (e: any) {
      this.logger.error(
        `Unable to get user data from database for id ${id}`,
        e,
      );
    }
  }

  async add(room: RoomEntity, nickname: string): Promise<UserID> {
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
