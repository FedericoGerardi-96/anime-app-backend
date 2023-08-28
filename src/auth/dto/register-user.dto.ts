import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  readonly email: string;
  @IsString()
  readonly name: string;
  @IsString()
  @IsOptional()
  readonly icon: string;
  @MinLength(8)
  readonly password: string;
}
