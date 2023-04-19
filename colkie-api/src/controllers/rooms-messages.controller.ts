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

@ApiTags('rooms messages')
@Controller('rooms/:roomId/messages')
export class RoomsMessagesController {
  constructor(private readonly roomsService: RoomsService) {}
}
