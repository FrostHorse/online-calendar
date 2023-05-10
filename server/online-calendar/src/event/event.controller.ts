import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEventDto } from './dtos/create-event.request.dto';
import { ModifyParticipationDto } from './dtos/modify-participation-request.dto';
import { UpdateEventDto } from './dtos/update-event-request.dto';
import { Events } from './event.schema';
import { EventService } from './event.service';

@Controller('events')
export class EventController {
  constructor(private eventService: EventService) {}

  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    return await this.eventService.create(createEventDto);
  }

  @Post("addParticipant")
  async addParticipantction(@Body() modifyParticipationDto: ModifyParticipationDto) {
    return await this.eventService.addParticipant(modifyParticipationDto.eventId,modifyParticipationDto.participantId, modifyParticipationDto.canModify ? modifyParticipationDto.canModify : false);
  }

  @Post("removeParticipant")
  async removeParticipantAction(@Body() modifyParticipationDto: ModifyParticipationDto) {
    return await this.eventService.removeParticipant(modifyParticipationDto.eventId,modifyParticipationDto.participantId);
  }

  @Get()
  async findAll(): Promise<Events[]> {
    return await this.eventService.findAll();
  }

  @Get('users/:id')
  async findUsersForEvents(@Param('id') id: string): Promise<Events[]> {
    const event = await this.eventService.findOne(id)
    const participants = event.participants.reduce((a, c) => {
      a.push(c.participantId.toHexString())
      return a;
    },[])
    return participants;
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
