import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SaveProgressDto } from './progress.dto';

@Injectable()
export class ProgressService {
  constructor(private readonly prisma: PrismaService) {}

  async get(userId: string) {
    const row = await this.prisma.progress.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });
    return this.toClient(row);
  }

  async save(userId: string, dto: SaveProgressDto) {
    const current = await this.get(userId);
    const quizzes = dto.quizzes ?? current.quizzes;
    const journals = dto.journals ?? current.journals;
    const viewed = dto.viewed ?? current.viewed;
    const row = await this.prisma.progress.update({
      where: { userId },
      data: {
        lastTab: dto.lastTab ?? current.lastTab,
        lastAct: dto.lastAct ?? current.lastAct,
        quizzes: JSON.stringify(quizzes),
        journals: JSON.stringify(journals),
        viewed: JSON.stringify(viewed),
      },
    });
    return this.toClient(row);
  }

  private toClient(row: {
    lastTab: string;
    lastAct: string;
    quizzes: string;
    journals: string;
    viewed: string;
    updatedAt: Date;
  }) {
    return {
      lastTab: row.lastTab,
      lastAct: row.lastAct,
      quizzes: JSON.parse(row.quizzes || '{}'),
      journals: JSON.parse(row.journals || '{}'),
      viewed: JSON.parse(row.viewed || '[]'),
      updatedAt: row.updatedAt,
    };
  }
}
