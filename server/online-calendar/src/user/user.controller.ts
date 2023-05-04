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

@Controller('users')
export class UserController {
  constructor(private usersService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto): Promise<User> {
    return await this.usersService.loginUser(
      loginUserDto.email,
      loginUserDto.password,
    );
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
  
  // These should be last place to avoid conflicts in endpoints calling
  @Get(':name')
  async findOne(@Param('name') name: string): Promise<User> {
    return await this.usersService.findOne(name);
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
