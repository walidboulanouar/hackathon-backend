import { Injectable } from '@nestjs/common';
import { CreateGridPlan, CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Country } from '@prisma/client';

@Injectable()
export class PlansService {
  constructor(private prisma:PrismaService){
    
  }
  async create(createPlanDto: CreatePlanDto) {
    const createPlans= await this.prisma.plans.createMany({
      data: [
        { name: 'Buy Thermostat', Reduction: 280 },
        { name: 'LED lights', Reduction: 100 },
        { name: 'Replace old gadgets with 5-star gadget', Reduction: 300 },
        { name: 'Reduce Thermostat by 2 deg', Reduction: 260 },
        { name: 'Solar', Reduction: 500 },
        { name: 'Turn off devices on standby', Reduction: 150 },
      ],
    })
    return createPlans;
  }

  async findAll() {
    const plans= await this.prisma.plans.findMany({
    })
    return plans;
  }

  async findAllGrids() {
    const grids= await this.prisma.gridFactor.findMany({
    })
    return grids;
  }

  async createGrids(body:CreateGridPlan){
    const createPlans= await this.prisma.gridFactor.create({
      data: 
      {
        year:body.year,
        country:body.country,
        factor:body.factor,
      },
    })
    return createPlans;
  }

  

  findOne(id: number) {
    return `This action returns a #${id} plan`;
  }

  update(id: number, updatePlanDto: UpdatePlanDto) {
    return `This action updates a #${id} plan`;
  }

  remove(id: number) {
    return `This action removes a #${id} plan`;
  }
}
