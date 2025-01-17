import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Shift } from '@prisma/client';

@Injectable()
export class AppService {
  listShiftsByDate(start: Date, end: Date): Promise<Shift[]> {
    return this.prisma.shift.findMany({
      where: {
        OR: [{
          startDate: {
            gte: start
          }
        }, {
          endDate: {
            lte: end
          }
        }]
      }
    });
  }
  createShift(shift: Shift) {
    return this.prisma.shift.create({
      data: shift
    })
  }
  constructor(private prisma: PrismaService) { }
  getHello(): string {
    return 'Hello World!';
  }


  listShifts(): Promise<Shift[]> {
    return this.prisma.shift.findMany();
  }
}
