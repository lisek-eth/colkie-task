import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class RoomsSendMessageRequestDto {
  @ApiProperty({
    name: 'userId',
    type: 'uuid',
    example: '1e2035b5-2108-4fe6-9347-61006722d66d',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({ name: 'message', type: String, example: 'Hello world!' })
  @IsString()
  message: string;
}
