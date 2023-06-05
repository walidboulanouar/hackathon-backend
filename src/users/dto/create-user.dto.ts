import { Country } from "@prisma/client";
import { IsIn } from "class-validator";

export class CreateUserDto {
    
    username:string;

    password:string;

    name:string;

    @IsIn(["fr","uk","de","be"])
    locationLive:Country;

    
    @IsIn(["fr","uk","de","be"])
    locationWork:Country;

    houseType:string;

    familySize:number;

    age:number;
}

export class CreateUserConsumptionDto {
    userId:number;

    consumption:number;

    startDate:String;

    endDate:String;
}

export class AddActionsToUser {
    userId:number;


    year:number;

    actions:number[];

}

export class loginDto {
    username:string;

    password:string;
}



