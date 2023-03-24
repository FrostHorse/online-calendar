import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateRankDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsArray()
  @IsOptional()
  permissions?: string[];
}
