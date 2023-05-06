import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsDefined()
  email: string;

  @IsDefined()
  @ApiProperty()
  @IsString()
  password: string;

  @IsDefined()
  @ApiProperty()
  @IsString()
  phoneNumber: string;
}
