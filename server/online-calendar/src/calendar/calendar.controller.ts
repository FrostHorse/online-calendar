import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Calendar } from './calendar.schema';
import { CalendarService } from './calendar.service';

import { CreateCalendarDto } from './dtos/create-calendar-request.dto';
import { ModifyEventDto } from './dtos/modify-event-request.dto';
import { UpdateCalendarDto } from './dtos/update-calendar-request.dto';

@Controller('calendars')
export class CalendarController {
  constructor(private calendarService: CalendarService) {}

  @Post()
  async create(@Body() createCalendarDto: CreateCalendarDto) {
    return await this.calendarService.create(createCalendarDto);
  }

  @Post("addEvent")
  async addEventAction(@Body() modifyEventDto: ModifyEventDto) {
    return await this.calendarService.addEvent(modifyEventDto.calendarId,modifyEventDto.eventId);
  }

  @Post("removeEvent")
  async removeEventAction(@Body() modifyEventDto: ModifyEventDto) {
    return await this.calendarService.removeEvent(modifyEventDto.calendarId,modifyEventDto.eventId);
  }

  @Get()
  async findAll(): Promise<Calendar[]> {
    return await this.calendarService.findAll();
  }

  @Get('user/:userId')
  async getCalendarsForUser(@Param('userId') id: string): Promise<Calendar[]> {
    return await this.calendarService.getCalendarsForUser(id);
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
