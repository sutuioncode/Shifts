import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Shift } from '@prisma/client';
import { ListShiftsByDate } from './models/requests/shifts'

@Controller('shifts')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello() + "ssss";
  }

  @Post('create-shift')
  create(@Body() shift: Shift) {
    return this.appService.createShift(shift)
  }

  @Get('list-shifts')
  listShifts(): Promise<Shift[]> {
    return this.appService.listShifts()
  }

  @Get('list-shifts-by-date')
  listShiftsByDaye(@Query() query: ListShiftsByDate): Promise<Shift[]> {
    return this.appService.listShiftsByDate(new Date(query.start), new Date(query.end))
  }
}
