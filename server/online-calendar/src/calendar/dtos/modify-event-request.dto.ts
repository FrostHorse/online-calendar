import { IsDefined, IsString } from 'class-validator';

export class ModifyEventDto {
  @IsDefined()
  @IsString()
  calendarId: string;

  @IsDefined()
  @IsString()
  eventId: string;
}
