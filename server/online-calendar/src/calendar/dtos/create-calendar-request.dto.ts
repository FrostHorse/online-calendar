import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class CreateCalendarDto {
  @IsDefined()
  @ApiProperty()
  @IsString()
  name: string;

  @IsDefined()
  @ApiProperty()
  @IsString()
  ownerId: string;
}
