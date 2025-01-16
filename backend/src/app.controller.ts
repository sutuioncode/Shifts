import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Shift } from '@prisma/client';

@Controller('shifts')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('list-shifts')
  listShifts(): Promise<Shift[]> {
    return this.appService.listShifts()
  }
}
