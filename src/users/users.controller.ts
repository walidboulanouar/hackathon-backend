import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { AddActionsToUser, CreateUserConsumptionDto, CreateUserDto, loginDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("register")
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('find/profile/:userId')
  findProfile(@Param("userId") id:string){
    return this.usersService.getProfile();
  }

  @Post("login")
  login(@Body() login: loginDto){
    return this.usersService.login(login);
  }

  @Post("consumption/create")
  createUserConsumption(@Body() consumption:CreateUserConsumptionDto){
    return this.usersService.createUserConsumption(consumption);
  }

  @Post("actions/add")
  addPlanToUser(@Body() actions:AddActionsToUser){
    return this.usersService.addPlanToUser(actions);
  }

  


  @Get("reduction/table/:userId")
  getReductionTable(@Param("userId") id:string){
    return this.usersService.getReductionTable(+id);
  }
  
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post('update')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
