import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RoomsAddUserResponseDto {
  @ApiProperty({
    name: 'id',
    type: 'uuid',
    example: '1e2035b5-2108-4fe6-9347-61006722d66d',
    description: 'User id',
  })
  @IsString()
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
