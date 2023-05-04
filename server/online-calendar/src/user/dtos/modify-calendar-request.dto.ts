import { Type } from 'class-transformer';
import { IsBoolean, IsDefined, IsOptional, IsString } from 'class-validator';

export class ModifyCalendarDto {
  @IsDefined()
  @IsString()
  userId: string;

  @IsDefined()
  @IsString()
  calendarId: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  canModify?: boolean;
}