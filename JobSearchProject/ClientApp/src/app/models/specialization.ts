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
        specializationType = null,
        employmentType = null,
        paymentType = null,
        educationType = null,
        paymentPrice = null,
        experience = null,
        recomendation = null
    ) { }
}
