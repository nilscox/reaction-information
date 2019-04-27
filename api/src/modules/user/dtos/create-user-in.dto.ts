import { IsOptional, IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class CreateUserInDto {

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(32)
  readonly nick: string;

  @IsString()
  @MinLength(6)
  @MaxLength(64)
  readonly password: string;

  @IsOptional()
  @IsString()
  @MaxLength(24)
  readonly avatar: string;

}
