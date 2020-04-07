import { EmploymentType, PaymentType, SpecializationType, EducationType } from "./enum";

export class Specialization {
    public specializationType: SpecializationType;
    public employmentType: EmploymentType;
    public paymentType: PaymentType;
    public educationType: EducationType;
    public paymentPrice: number;
    public experience: number;
    public recomendation: boolean;

    constructor(        
    ) {
        this.specializationType = null;
        this.employmentType = null;
        this.paymentType = null;
        this.educationType = null;
        this.paymentPrice = null;
        this.experience = null;
        this.recomendation = null;
    }
}
