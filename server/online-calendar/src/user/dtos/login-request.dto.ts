import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @ApiProperty()
  @IsDefined()
  email: string;

  @IsDefined()
  @ApiProperty()
  @IsString()
  password: string;
}
