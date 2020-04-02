import { Specialization } from "./specialization";
import { Location } from "./location";
import { Status } from "./enum";

export class DriverVacancy {
    ageFrom: number;
    ageTo: number;
    status: Status;
    contactName: string;
    driverExperience: number;
    description: string;
    specialization: Specialization;
    location: Location;
}



