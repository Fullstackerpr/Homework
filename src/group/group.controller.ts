import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  create(@Body() createUserDto: CreateGroupDto) {
    return this.groupService.create(createUserDto);
  }

  @Get()
  getAll() {
    return this.groupService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.groupService.getById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateGroupDto) {
    return this.groupService.update(id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.groupService.delete(id);
  }
}
