import { Specialization } from "./specialization";
import { Location } from "./location";
import { Status } from "./enum";
import { Experience } from "./experience";

export class Resume {
    public id: number;
    public description: string;
    public age: number;
    public status: Status;
    public top: boolean;
    public contactName: string;
    public photo: string;
    public specialization: Specialization;
    public location: Location;
    public experiences: Experience[];

    constructor(
    ) {
        this.id = null;
        this.description = null;
        this.age = null;
        this.status = null;
        this.top = false;
        this.contactName = null;
        this.photo = null;
        this.specialization = new Specialization();
        this.location = new Location();
        this.experiences = new Array<Experience>()
    }
}
