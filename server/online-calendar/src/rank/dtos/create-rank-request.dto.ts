import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDefined, IsString } from 'class-validator';

export class CreateRankDto {
  @IsDefined()
  @ApiProperty()
  @IsString()
  name: string;

  @IsArray()
  @IsDefined()
  @ApiProperty()
  permissions: string[];
}
