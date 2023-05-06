import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateRankDto {
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  name?: string;

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional()
  permissions?: string[];
}
