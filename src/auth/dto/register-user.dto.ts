import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  readonly email: string;
  @IsString()
  readonly name: string;
  @IsOptional()
  readonly icon: string | null;
  @MinLength(8)
  readonly password: string;
}

