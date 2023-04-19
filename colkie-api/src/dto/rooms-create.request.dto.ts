import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RoomsCreateRequestDto {
  @ApiProperty({ name: 'name', type: String, example: 'Default room' })
  @IsString()
  name: string;
}
