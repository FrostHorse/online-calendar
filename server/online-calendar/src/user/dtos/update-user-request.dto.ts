import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  @ApiPropertyOptional()
  email?: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  phoneNumber?: string;
}
