import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsService } from './services/rooms.service';
import { RoomEntity } from './entities/room.entity';
import { RoomsController } from './controllers/rooms.controller';
import { RoomMessageEntity } from './entities/room-message.entity';
import { RoomUserEntity } from './entities/room-user.entity';
import { RoomsUsersController } from './controllers/rooms-users.controller';
import { RoomsMessagesController } from './controllers/rooms-messages.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get('DB_PORT')),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([RoomEntity, RoomUserEntity, RoomMessageEntity]),
  ],
  controllers: [RoomsController, RoomsUsersController, RoomsMessagesController],
  providers: [RoomsService],
})
export class AppModule {}
