import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RoomsSendMessageRequestDto } from 'src/dto/rooms-send-message.request.dto';
import { RoomMessageEntity } from 'src/entities/room-message.entity';
import { RoomsMessagesService } from 'src/services/rooms-messages.service';
import { RoomsUsersService } from 'src/services/rooms-users.service';
import { RoomsService } from 'src/services/rooms.service';

@ApiTags('rooms messages')
@Controller('rooms/:roomId/messages')
export class RoomsMessagesController {
  constructor(
    private readonly roomsMessagesService: RoomsMessagesService,
    private readonly roomsService: RoomsService,
    private readonly roomsUsersService: RoomsUsersService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Send a message to a room' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiCreatedResponse()
  async sendMessage(
    @Param('roomId') roomId: string,
    @Body()
    roomsSendMessageRequestDto: RoomsSendMessageRequestDto,
  ): Promise<void> {
    const room = await this.roomsService.get(roomId);

    if (!room)
      throw new BadRequestException(`Room with id ${roomId} does not exist`);

    const user = await this.roomsUsersService.get(
      roomsSendMessageRequestDto.userId,
    );

    if (!user)
      throw new BadRequestException(
        `User with id ${roomsSendMessageRequestDto.userId} does not exist`,
      );

    await this.roomsMessagesService.addMessage(
      room,
      user,
      roomsSendMessageRequestDto.message,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get X recent messages' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiOkResponse({ type: RoomMessageEntity, isArray: true })
  async getMessages(
    @Param('roomId') roomId: string,
    @Query('limit') limit: number,
  ): Promise<RoomMessageEntity[]> {
    return this.roomsMessagesService.getRecent(roomId, limit);
  }
}
