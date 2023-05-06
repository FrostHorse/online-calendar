import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCalendarDto {
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  ownerId?: string;
}
