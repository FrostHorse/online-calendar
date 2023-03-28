import { IsDefined, IsString } from 'class-validator';

export class CreateCalendarDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  ownerId: string;
}
