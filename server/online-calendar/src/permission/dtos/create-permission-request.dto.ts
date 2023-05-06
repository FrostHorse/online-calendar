import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class CreatePermissionDto {
  @IsDefined()
  @ApiProperty()
  @IsString()
  name: string;
}
