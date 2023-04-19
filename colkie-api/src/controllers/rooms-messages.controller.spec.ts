import { Test, TestingModule } from '@nestjs/testing';
import { RoomsMessagesController } from './rooms-messages.controller';
import { createMock } from '@golevelup/ts-jest';
import { Repository } from 'typeorm';
import { RoomEntity } from '../entities/room.entity';
import { RoomsMessagesService } from '../services/rooms-messages.service';
import { RoomsService } from '../services/rooms.service';
import { RoomsUsersService } from '../services/rooms-users.service';
import { RoomMessageEntity } from 'src/entities/room-message.entity';
import { RoomUserEntity } from 'src/entities/room-user.entity';
import { RoomsSendMessageRequestDto } from 'src/dto/rooms-send-message.request.dto';

const roomsRepositoryMock = createMock<Repository<RoomEntity>>();
const roomsMessagesRepositoryMock = createMock<Repository<RoomMessageEntity>>();
const roomsUsersRepositoryMock = createMock<Repository<RoomUserEntity>>();

describe('Rooms Messages Controller', () => {
  let roomsMessagesController: RoomsMessagesController;
  let roomsService: RoomsService;
  let roomsUsersService: RoomsUsersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        RoomsMessagesController,
        RoomsMessagesService,
        RoomsUsersService,
        RoomsService,
        {
          provide: 'RoomEntityRepository',
          useValue: roomsRepositoryMock,
        },
        {
          provide: 'RoomMessageEntityRepository',
          useValue: roomsMessagesRepositoryMock,
        },
        {
          provide: 'RoomUserEntityRepository',
          useValue: roomsUsersRepositoryMock,
        },
      ],
    }).compile();

    roomsMessagesController = app.get<RoomsMessagesController>(
      RoomsMessagesController,
    );

    roomsService = app.get<RoomsService>(RoomsService);
    roomsUsersService = app.get<RoomsUsersService>(RoomsUsersService);
  });

  describe('sendMessage', () => {
    it('Should throw an error if roomId was not found', async () => {
      jest.spyOn(roomsService, 'get').mockResolvedValue(null);

      await expect(
        roomsMessagesController.sendMessage(
          'test_room_id',
          {} as RoomsSendMessageRequestDto,
        ),
      ).rejects.toThrowError();
    });

    it('Should throw an error if userId was not found', async () => {
      jest
        .spyOn(roomsService, 'get')
        .mockResolvedValue({ id: 'test_room_id' } as RoomEntity);

      jest.spyOn(roomsUsersService, 'get').mockResolvedValue(null);

      await expect(
        roomsMessagesController.sendMessage('test_room_id', {
          userId: 'user_id',
        } as RoomsSendMessageRequestDto),
      ).rejects.toThrowError();
    });

    it('Should succeed to send message if roomdId and userId exist', async () => {
      jest
        .spyOn(roomsService, 'get')
        .mockResolvedValue({ id: 'test_room_id' } as RoomEntity);

      jest
        .spyOn(roomsUsersService, 'get')
        .mockResolvedValue({ id: 'test_user_id' } as RoomUserEntity);

      await expect(
        roomsMessagesController.sendMessage('test_room_id', {
          userId: 'test_user_id',
        } as RoomsSendMessageRequestDto),
      ).resolves;
    });
  });
});
