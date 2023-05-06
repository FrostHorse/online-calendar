import {
  IsBoolean,
  IsDate,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Place } from '../event.schema';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateEventDto {
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsObject()
  place?: Place;

  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  ownerId?: string;

  @IsOptional()
  @Type(() => Date)
  @ApiPropertyOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @ApiPropertyOptional()
  endDate?: Date;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  comment?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  @ApiPropertyOptional()
  allDay?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  @ApiPropertyOptional()
  recurring?: boolean;
}
