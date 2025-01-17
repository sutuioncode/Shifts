import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Shift } from '@prisma/client';

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
}
