import {
  Body, Controller, Delete, Get, Param,
  Patch, Post
} from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user-request.dto';
import { LoginUserDto } from './dtos/login-request.dto';
import { UpdateUserDto } from './dtos/update-user-request.dto';
import { User } from './user.schema';
import { UserService } from './user.service';
import { Calendar } from 'src/calendar/calendar.schema';
import { ModifyCalendarDto } from './dtos/modify-calendar-request.dto';
import { AttachRankDto } from './dtos/attach-rank.dto';

@Controller('users')
export class UserController {
  constructor(private usersService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto): Promise<User> {
    return await this.usersService.loginUser(
      loginUserDto.email,
      loginUserDto.password,
    );
  }
  @Get('calendars/:userId')
  async findCalendarsForUser(@Param('userId') userId: string): Promise<Calendar[]> {
    return await this.usersService.getCalendarsForUser(userId);
  }

  @Get('get/:calendarId')
  async findUsersForCalendar(@Param('calendarId') calendarId: string) {
    return await this.usersService.getUsersForCalendars(calendarId);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get("visibleCalendars/:userId")
  async findAVisibleCalendars(@Param('userId') userId: string): Promise<User[]> {
    return await this.usersService.getCalendarWithEventsForUser(userId);
  }

  @Post("addCalendar")
  async addCalendarAction(@Body() modifyCalendarnDto: ModifyCalendarDto) {
    return await this.usersService.addCalendar(modifyCalendarnDto.userId,modifyCalendarnDto.calendarId, modifyCalendarnDto.canModify ? modifyCalendarnDto.canModify : false);
  }

  @Post("removeCalendar")
  async removeCalendarAction(@Body() modifyCalendarDto: ModifyCalendarDto) {
    return await this.usersService.removeCalendar(modifyCalendarDto.userId,modifyCalendarDto.calendarId);
  }

  @Post("addRank")
  async addRankAction(@Body() attachRankDto: AttachRankDto) {
    return await this.usersService.addRank(attachRankDto.userId,attachRankDto.rankId);
  }

  @Post("removeRank")
  async removeRankAction(@Body() attachRankDto: AttachRankDto) {
    return await this.usersService.removeRank(attachRankDto.userId,attachRankDto.rankId);
  }
  
  // These should be last place to avoid conflicts in endpoints calling
  @Get(':email')
  async findOne(@Param('email') email: string): Promise<User> {
    return await this.usersService.findOne(email);
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.updateOne(id, updateUserDto);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.deleteOne(id);
  }
}
