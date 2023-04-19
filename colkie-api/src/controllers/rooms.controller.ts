import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RoomsCreateRequestDto } from '../dto/rooms-create.request.dto';
import { RoomsCreateResponseDto } from '../dto/rooms-create.response.dto';
import { RoomsService } from '../services/rooms.service';

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @ApiOperation({ summary: 'Create room' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiCreatedResponse({ type: RoomsCreateResponseDto })
  async createRoom(
    @Body() roomsCreateDto: RoomsCreateRequestDto,
  ): Promise<RoomsCreateResponseDto> {
    const newRoomId = await this.roomsService.create(roomsCreateDto.name);

    return new RoomsCreateResponseDto(newRoomId);
  }
}
