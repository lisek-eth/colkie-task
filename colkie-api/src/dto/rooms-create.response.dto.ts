import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class RoomsCreateResponseDto {
  @ApiProperty({
    name: 'id',
    type: 'uuid',
    example: '1e2035b5-2108-4fe6-9347-61006722d66d',
  })
  @IsUUID()
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
