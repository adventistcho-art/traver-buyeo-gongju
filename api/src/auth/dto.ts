import { IsInt, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class RegisterDto {
  @IsString()
  @MinLength(1)
  @MaxLength(40)
  name: string;

  @IsString()
  @MinLength(1)
  @MaxLength(80)
  school: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  age?: number;

  @IsString()
  @MinLength(4)
  @MaxLength(64)
  password: string;
}

export class LoginDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  school: string;

  @IsString()
  @MinLength(4)
  password: string;
}
