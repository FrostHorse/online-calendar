import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class AttachPermissionDto {
  @IsDefined()
  @ApiProperty()
  @IsString()
  rankId: string;

  @IsDefined()
  @ApiProperty()
  @IsString()
  permissionId: string;
}
