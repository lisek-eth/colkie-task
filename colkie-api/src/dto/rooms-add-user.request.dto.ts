import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RoomsAddUserRequestDto {
  @ApiProperty({ name: 'name', type: String, example: 'Jhon' })
  @IsString()
  name: string;
}
