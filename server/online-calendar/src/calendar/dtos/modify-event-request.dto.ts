import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class ModifyEventDto {
  @IsDefined()
  @ApiProperty()
  @IsString()
  calendarId: string;

  @IsDefined()
  @ApiProperty()
  @IsString()
  eventId: string;
}
