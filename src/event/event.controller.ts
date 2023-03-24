import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { EventService } from './event.service';
import { Events } from './event.schema';
import { CreateEventDto } from './dtos/create-event.request.dto';
import { UpdateEventDto } from './dtos/update-event-request.dto';

@Controller('events')
export class EventController {
  constructor(private eventService: EventService) {}

  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    await this.eventService.create(createEventDto);
  }

  @Get()
  async findAll(): Promise<Events[]> {
    return await this.eventService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Events> {
    return await this.eventService.findOne(id);
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateEventDto,
  ): Promise<Events> {
    return await this.eventService.updateOne(id, updateUserDto);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<Events> {
    return await this.eventService.deleteOne(id);
  }
}
