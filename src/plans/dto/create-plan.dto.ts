import { Country } from "@prisma/client";
import { IsIn } from "class-validator";

export class CreatePlanDto {
    name:String;


    reduction:Number;
}

export class CreateGridPlan {
    
        year:number;
        factor:number;
        @IsIn(["fr","uk","de","be"])
        country:Country;
}
