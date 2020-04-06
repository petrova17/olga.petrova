import { Specialization } from "./specialization";
import { Location } from "./location";
import { Status } from "./enum";

export class Vacancy {
    public id: number;
    public ageFrom: number;
    public ageTo: number;
    public status: Status;
    public contactName: string;
    public description: string;
    public specialization: Specialization;
    public location: Location;

    constructor(
        id = null,
        ageFrom = null,
        ageTo = null,
        status = null,
        contactName = null,
        drivingExperience = null,
        description = null,
        specialization = new Specialization(),
        location = new Location()
    ) { }
}
