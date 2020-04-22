import { EmploymentType, PaymentType, SpecializationType, EducationType } from "./enum";

export class Specialization {
    public specializationType: SpecializationType = null;
    public employmentType: EmploymentType = null;
    public paymentType: PaymentType = null;
    public educationType: EducationType = null;
    public paymentPrice: number = null;
    public experience: number = null;
    public recomendation: boolean = null;
}
