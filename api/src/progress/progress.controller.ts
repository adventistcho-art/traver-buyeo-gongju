import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { SaveProgressDto } from './progress.dto';
import { ProgressService } from './progress.service';

@Controller('progress')
@UseGuards(AuthGuard)
export class ProgressController {
  constructor(private readonly progress: ProgressService) {}

  @Get()
  get(@Req() req: { user: { sub: string } }) {
    return this.progress.get(req.user.sub);
  }

  @Put()
  save(
    @Req() req: { user: { sub: string } },
    @Body() dto: SaveProgressDto,
  ) {
    return this.progress.save(req.user.sub, dto);
  }
}
