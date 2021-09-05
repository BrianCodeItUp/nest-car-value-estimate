import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
} from '@nestjs/common';
import {
  CreateReportDto,
  ReportDto,
  ApproveReportDto,
  GetEstimateDto,
} from './dtos';
import { ReportsService } from './reports.service';
import { AuthGuard, AdminGuard } from '../guards';
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

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportsService.changeApproval(id, body.approved);
  }
}
