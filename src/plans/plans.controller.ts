import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlansService } from './plans.service';
import { CreateGridPlan, CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Post("create")
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.plansService.create(createPlanDto);
  }

  @Get("findall")
  findAll() {
    return this.plansService.findAll();
  }


  @Post("grid/create")
  createGrids(@Body() body:CreateGridPlan){
    return this.plansService.createGrids(body);
  }


  @Get("grid/findall")
  findAllGrids(){
    return this.plansService.findAllGrids();
  }




  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plansService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanDto: UpdatePlanDto) {
    return this.plansService.update(+id, updatePlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plansService.remove(+id);
  }
}
