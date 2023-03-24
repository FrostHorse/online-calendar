import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Calendar, CalendarSchema } from './calendar.schema';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Calendar.name, schema: CalendarSchema },
    ]),
  ],
  controllers: [CalendarController],
  providers: [CalendarService],
})
export class CalendarModule {}
