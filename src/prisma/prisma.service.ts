import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      datasources: {
        db: {
          url: 'mysql://backendsedihisha_ali:Walid0624680@84.16.234.19:3306/backendsedihisha_Robotizia', //link url of backendRobotizia
        },
      },
    });
  }
  async onModuleDestroy() {
    await this.$connect; //await this.connect
  }
  async onModuleInit() {
    this.$disconnect;   //await this.diconnect
  }
}
