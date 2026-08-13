import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const name = dto.name.trim();
    const school = dto.school.trim();
    const existing = await this.prisma.user.findUnique({
      where: { name_school: { name, school } },
    });
    if (existing) {
      throw new ConflictException(
        '이미 만든 탐험대원 카드예요. ‘이어가기’로 들어와 주세요.',
      );
    }
    const user = await this.prisma.user.create({
      data: {
        name,
        school,
        age: dto.age ?? null,
        password: await bcrypt.hash(dto.password || '', 10),
        progress: { create: {} },
      },
    });
    return this.issue(user);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        name_school: { name: dto.name.trim(), school: dto.school.trim() },
      },
    });
    if (!user) {
      throw new UnauthorizedException('이름과 학교를 다시 확인해 주세요.');
    }
    return this.issue(user);
  }

  async me(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, school: true, age: true },
    });
    if (!user) throw new UnauthorizedException('다시 로그인해 주세요.');
    return user;
  }

  private issue(user: { id: string; name: string; school: string; age: number | null }) {
    const token = this.jwt.sign({
      sub: user.id,
      name: user.name,
      school: user.school,
    });
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        school: user.school,
        age: user.age,
      },
    };
  }
}
