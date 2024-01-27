import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
    // return createUserDto
  }

  @Get()
  findAll(@Query('role') role?: string) {
    return this.userService.findAll(role);
    // if (role) {
    //   return {role, users: []}
    // }
    // return []
  }

  @Get('profile')
  getProfile(){
    return 'This is your profile'
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
    // return {id}
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: {name?: string, email?: string, role?: string}) {
    return this.userService.update(+id, updateUserDto);
    // return {id, ...updateUserDto}
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
    // return {id}
  }
}
