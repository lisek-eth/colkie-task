import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RoomsAddUserRequestDto } from '../dto/rooms-add-user.request.dto';
import { RoomsAddUserResponseDto } from '../dto/rooms-add-user.response.dto';
import { RoomsUsersService } from '../services/rooms-users.service';
import { RoomsService } from '../services/rooms.service';

@ApiTags('rooms users')
@Controller('rooms/:roomId/users')
export class RoomsUsersController {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly roomsUsersService: RoomsUsersService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Add a user to a room' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiCreatedResponse({ type: RoomsAddUserResponseDto })
  async createRoom(
    @Param('roomId') roomId: string,
    @Body()
    roomsAddUserRequestDto: RoomsAddUserRequestDto,
  ): Promise<RoomsAddUserResponseDto> {
    const room = await this.roomsService.get(roomId);

    if (!room) throw new BadRequestException(`Room ${roomId} does not exist`);

    const newUserId = await this.roomsUsersService.add(
      room,
      roomsAddUserRequestDto.name,
    );

    return new RoomsAddUserResponseDto(newUserId);
  }
}
