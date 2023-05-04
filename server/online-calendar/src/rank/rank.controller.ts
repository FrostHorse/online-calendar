import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { Rank } from './rank.schema';
import { RankService } from './rank.service';
import { CreateRankDto } from './dtos/create-rank-request.dto';
import { UpdateRankDto } from './dtos/update-rank-request.dto';
import { AttachPermissionDto } from './dtos/attach-permission.dto';

@Controller('ranks')
export class RankController {
  constructor(private rankService: RankService) {}

  @Post()
  async create(@Body() createRankDto: CreateRankDto) {
    await this.rankService.create(createRankDto);
  }

  @Post('addPermission')
  async addPermissionAction(@Body() attachPermissionDto: AttachPermissionDto): Promise<Rank> {
    return await this.rankService.addPermisson(attachPermissionDto.rankId, attachPermissionDto.permissionId);
  }

  @Post('removePermission')
  async removePermissionAction(@Body() attachPermissionDto: AttachPermissionDto): Promise<Rank>{
    return await this.rankService.removePermisson(attachPermissionDto.rankId, attachPermissionDto.permissionId);
  }

  @Get()
  async findAll(): Promise<Rank[]> {
    return await this.rankService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Rank> {
    return await this.rankService.findOne(id);
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateRankDto,
  ): Promise<Rank> {
    return await this.rankService.updateOne(id, updateUserDto);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<Rank> {
    return await this.rankService.deleteOne(id);
  }
}
