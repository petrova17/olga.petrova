import { Specialization } from "./specialization";
import { Location } from "./location";
import { Status } from "./enum";

export class Vacancy {
    public id: number = null;
    public ageFrom: number = null;
    public ageTo: number = null;
    public status: Status = null;
    public top: boolean = null;
    public contactName: string = null;
    public description: string = null;
    public specialization: Specialization = new Specialization();
    public location: Location = new Location();
}
