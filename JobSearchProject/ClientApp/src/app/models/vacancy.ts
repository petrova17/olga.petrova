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
    ) {
        this.id = null;
        this.ageFrom = null;
        this.ageTo = null;
        this.status = null;
        this.contactName = null;
        this.description = null;
        this.specialization = new Specialization();
        this.location = new Location();
    }
}
