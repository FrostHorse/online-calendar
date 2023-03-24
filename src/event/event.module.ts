import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema, Events } from './event.schema';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Events.name, schema: EventSchema }]),
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
