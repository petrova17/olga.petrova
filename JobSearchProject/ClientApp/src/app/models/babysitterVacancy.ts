import { Vacancy } from "./vacancy";
import { LanguageType } from "./enum";
import { Education } from "./education";

export class BabysitterVacancy extends Vacancy {
    public childNumber: number = null;
    public nativeLanguage: LanguageType = null;
    public otherLanguages: string = null;
    public driverLicense: boolean = null;
    public ownChildren: boolean = null;
    public officialEmployment: boolean = null;
    public medicineBook: boolean = null;
    public specialChild: boolean = null;
    public videoSurveillance: boolean = null;
    public foreignPassport: boolean = null;
    public travelWithFamily: boolean = null;
    public workingHours: string = null;
    public responsibilities: string = null;
    public criminalRecord: boolean = null;
    public beginningOfWork: string = null;
    public details: string = null;
    public pet: boolean = null;
    public education: Education = new Education();

}


