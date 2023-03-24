import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { Calendar } from './calendar.schema';
import { CreateCalendarDto } from './dtos/create-calendar-request.dto';
import { UpdateCalendarDto } from './dtos/update-calendar-request.dto';

@Controller('calendars')
export class CalendarController {
  constructor(private calendarService: CalendarService) {}

  @Post()
  async create(@Body() createCalendarDto: CreateCalendarDto) {
    await this.calendarService.create(createCalendarDto);
  }

  @Get()
  async findAll(): Promise<Calendar[]> {
    return await this.calendarService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Calendar> {
    return await this.calendarService.findOne(id);
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateCalendarDto,
  ): Promise<Calendar> {
    return await this.calendarService.updateOne(id, updateUserDto);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<Calendar> {
    return await this.calendarService.deleteOne(id);
  }
}
