import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RoomsAddUserRequestDto } from 'src/dto/rooms-add-user.request.dto';
import { RoomsAddUserResponseDto } from 'src/dto/rooms-add-user.response.dto';
import { RoomsService } from 'src/services/rooms.service';

@ApiTags('rooms users')
@Controller('rooms/:roomId/users')
export class RoomsUsersController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @ApiOperation({ summary: 'Add a user to a room' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiOkResponse({ type: RoomsAddUserResponseDto })
  async createRoom(
    @Param('roomId') roomId: string,
    @Body()
    roomsAddUserRequestDto: RoomsAddUserRequestDto,
  ): Promise<RoomsAddUserResponseDto> {
    const room = await this.roomsService.get(roomId);

    if (!room) throw new BadRequestException(`Room ${roomId} does not exist`);

    const newUserId = await this.roomsService.addUser(
      room,
      roomsAddUserRequestDto.name,
    );

    return new RoomsAddUserResponseDto(newUserId);
  }
}
