import { Vacancy } from "./vacancy";
import { LanguageType } from "./enum";
import { Education } from "./education";

export class BabysitterVacancy extends Vacancy {
    public childNumber: number;
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
    public workingHours: string;
    public responsibilities: string;
    public criminalRecord: boolean;
    public beginningOfWork: string;
    public details: string;
    public pet: boolean;
    public education: Education;

    constructor(
    ) {
        super();
        this.childNumber = null;
        this.nativeLanguage = null;
        this.childNumber = null;
        this.otherLanguages = null;
        this.driverLicense = null;
        this.ownChildren = null;
        this.officialEmployment = null;
        this.medicineBook = null;
        this.specialChild = null;
        this.videoSurveillance = null;
        this.foreignPassport = null;
        this.travelWithFamily = null;
        this.workingHours = null;
        this.responsibilities = null;
        this.criminalRecord = null;
        this.beginningOfWork = null;
        this.details = null;
        this.beginningOfWork = null;
        this.pet = null;
        this.education = new Education();
    }
}


