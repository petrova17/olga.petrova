import { LanguageType } from "./enum";
import { Education } from "./education";
import { Resume } from "./resume";

export class BabysitterResume extends Resume {
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
    public responsibilities: string = null;
    public details: string = null;
    public education: Education = new Education();
}


