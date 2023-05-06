import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDefined, IsOptional, IsString } from 'class-validator';

export class ModifyCalendarDto {
  @IsDefined()
  @ApiProperty()
  @IsString()
  userId: string;

  @IsDefined()
  @ApiProperty()
  @IsString()
  calendarId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  canModify?: boolean;
}