import { IsArray, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class SaveProgressDto {
  @IsOptional()
  @IsString()
  @MaxLength(40)
  lastTab?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  lastAct?: string;

  @IsOptional()
  @IsObject()
  quizzes?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  journals?: Record<string, unknown>;

  @IsOptional()
  @IsArray()
  viewed?: string[];
}
