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

@Controller('ranks')
export class RankController {
  constructor(private rankService: RankService) {}

  @Post()
  async create(@Body() createRankDto: CreateRankDto) {
    await this.rankService.create(createRankDto);
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
