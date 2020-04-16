import { LanguageType } from "./enum";
import { Education } from "./education";
import { Resume } from "./resume";

export class BabysitterResume extends Resume {
    public nativeLanguage: LanguageType;
    public otherLanguages: string;
    public driverLicense: boolean;
    public ownChildren: boolean;
    public officialEmployment: boolean;
    public medicineBook: boolean;
    public specialChild: boolean;
    public videoSurveillance: boolean;
    public foreignPassport: boolean;
    public travelWithFamily: boolean;
    public responsibilities: string;
    public details: string;
    public education: Education;

    constructor(
    ) {
        super();
        this.nativeLanguage = null;
        this.otherLanguages = null;
        this.driverLicense = null;
        this.ownChildren = null;
        this.officialEmployment = null;
        this.medicineBook = null;
        this.specialChild = null;
        this.videoSurveillance = null;
        this.foreignPassport = null;
        this.travelWithFamily = null;
        this.responsibilities = null;
        this.details = null;
        this.education = new Education();
    }
}


