import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { Permission } from './permission.schema';
import { CreatePermissionDto } from './dtos/create-permission-request.dto';
import { UpdatePermissionDto } from './dtos/update-permissions-request.dto';

@Controller('permissions')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Post()
  async create(@Body() createPermissionDto: CreatePermissionDto) {
    await this.permissionService.create(createPermissionDto);
  }

  @Get()
  async findAll(): Promise<Permission[]> {
    return await this.permissionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Permission> {
    return await this.permissionService.findOne(id);
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateUserDto: UpdatePermissionDto,
  ): Promise<Permission> {
    return await this.permissionService.updateOne(id, updateUserDto);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<Permission> {
    return await this.permissionService.deleteOne(id);
  }
}
