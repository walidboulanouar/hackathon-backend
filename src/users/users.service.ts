import { ForbiddenException, Injectable } from '@nestjs/common';
import { AddActionsToUser, CreateUserConsumptionDto, CreateUserDto, loginDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma:PrismaService){
    
  }

  async login(login:loginDto){
    const user= await this.prisma.user.findFirst({
      where:{
        username:login.username,
      }
    });

    if( !user)  throw new ForbiddenException("user dosn't exist");

    if (user.password !=login.password){
      throw new ForbiddenException("password is incorrect");
    }

    return {message:"connected Succefully"};

  }
  async getProfile(){
    const profile= await this.prisma.user.findUnique({
      where:{
        id:1,
      },
      include:{
        actions:true,
        consumptions:true,
      }
    });

    return profile;
  }


  async create(createUserDto: CreateUserDto) {
    const newUser= await this.prisma.user.create({
      data:{
        name:createUserDto.name,
        locationLive:createUserDto.locationLive,
        locationWork:createUserDto.locationWork,
        houseType:createUserDto.houseType,
        age:createUserDto.age,
        username:createUserDto.username,
        familySize:createUserDto.familySize,
      }
    })
    return newUser;
  }




  async createUserConsumption(consumption:CreateUserConsumptionDto){
    const consumptionUser= await this.prisma.consumption.create({
      data:{
        consumption:consumption.consumption,
        startDate:consumption.startDate.concat("T21:42:40.428Z"),
        endDate:consumption.endDate.concat("T21:42:40.428Z"),
        userId:consumption.userId,
      }
    })

    return consumptionUser;
  }




  async addPlanToUser(actions:AddActionsToUser){
    let data=[];
    actions.actions.forEach((planId)=>{
      data.push({
        planId:planId,
      })
    });

    




    const user=await this.prisma.actions.create({
      data:{
        userId:actions.userId,
        year:actions.year,
        PlanActions:{
          createMany:{
            data:data,
          }
        },
      
      },
      include:{
        PlanActions:{
          include:{
            Plans:true,
          }
        }
      }
    })

    return user;
    
  }

  async getReductionTable(id:number=1){
    const user= await this.prisma.user.findUnique({
      where:{
        id:id,
      },
      include:{
        actions:{
          include:{
            PlanActions:{
              include:{
                Plans:true,
              }
            }
          }
        },
        consumptions:true,
      }
    })



    
    

    let totalConsumption = 0;
    let latestYear = 2020;
    for (let consumption of user.consumptions) {
      totalConsumption += consumption.consumption;

      const consumptionYear = consumption.endDate.getFullYear();
      if (consumptionYear > latestYear) {
        latestYear = consumptionYear;
      }
    }

    console.log()


    const gridFactor= await this.prisma.gridFactor.findFirst({
      where:{
        year:2023,
        country:"fr",
      }
    });


    let data= []
    data.push({
      year:latestYear,
      factory:gridFactor.factor*totalConsumption,
    });


    let earliestActionYear = 2023;
    let latestActionYear = 2027;
    for (let action of user.actions) {
      if (action.year < earliestActionYear) {
        earliestActionYear = action.year;
      }
      if (action.year > latestActionYear) {
        latestActionYear = action.year;
      }
    }

    console.log("earliestActionYear",earliestActionYear);
    console.log("latestActionYear",latestActionYear);



    // here we calculate how much emissions for each year
    let table=[];
    let factor:number= gridFactor.factor*totalConsumption;

    for (let year = earliestActionYear; year <= latestActionYear; year++) {
      console.log(year);
      const actions= await this.prisma.actions.findFirst({
        where:{
          year:year,
          userId:id,
        },
        include:{
          PlanActions:{
            include:{
              Plans:{
                select:{
                  Reduction:true,
                  id:true,
                }
              },
            }
          }
        }
      })

      console.log(actions.PlanActions);
      let plans=[]
      
      if (actions) {
        console.log(actions.PlanActions)
        for (let i = 0; i < actions.PlanActions.length; i++) {
          const plan=actions.PlanActions[i].Plans;  // Do something with each PlanAction
          plans.push(plan.id);
          const gridFactor= await this.prisma.gridFactor.findFirst({
            where:{
              country:"fr",
              year:year,
            }
          });

          console.log(factor);
          factor =factor- plan.Reduction*(gridFactor?gridFactor.factor:0.03);
        }
      }

      


      table.push({
        year:year,
        factor:factor,
        plans:plans,
      })
    }





    return table;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
