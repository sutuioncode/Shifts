import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Shift } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  getHello(): string {
    return 'Hello World!' ; 
  }

  listShifts(): Promise<Shift[]>{
    return this.prisma.shift.findMany();
  }
}
