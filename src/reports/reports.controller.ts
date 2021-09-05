import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateReportDto, ReportDto } from './dtos';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards';
import { CurrentUser } from '../users/decorators';
import { User } from '../users/user.entity';
import { Serialize } from '../interceptors';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }
}
