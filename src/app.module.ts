import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { RankModule } from './rank/rank.module';
import { PermissionModule } from './permission/permission.module';
import { EventModule } from './event/event.module';
import { CalendarModule } from './calendar/calendar.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/calendar'),
    UserModule,
    RankModule,
    PermissionModule,
    EventModule,
    CalendarModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
