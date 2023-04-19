import { Test, TestingModule } from '@nestjs/testing';
import { RoomsService } from '../services/rooms.service';
import { createMock } from '@golevelup/ts-jest';
import { RoomEntity } from 'src/entities/room.entity';
import { Repository } from 'typeorm';

const roomsRepositoryMock = createMock<Repository<RoomEntity>>();

describe('Rooms Service', () => {
  let roomsService: RoomsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        RoomsService,
        {
          provide: 'RoomEntityRepository',
          useValue: roomsRepositoryMock,
        },
      ],
    }).compile();

    roomsService = app.get<RoomsService>(RoomsService);
  });

  it('It should throw an error if name is missing', async () => {
    await expect(roomsService.create('')).rejects.toThrowError();
  });

  it('It should create new room and return ID if name is provided', async () => {
    roomsRepositoryMock.save.mockResolvedValueOnce({
      id: 'test_id',
    } as RoomEntity);

    await expect(roomsService.create('new room')).resolves.toEqual('test_id');
  });
});
