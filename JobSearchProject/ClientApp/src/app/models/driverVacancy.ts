import { Vacancy } from "./vacancy";

export class DriverVacancy extends Vacancy{
    public drivingExperience: number;

    constructor(        
      drivingExperience = null
    ) {
        super();
    }
}


