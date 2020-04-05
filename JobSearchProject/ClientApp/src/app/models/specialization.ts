import { EmploymentType, PaymentType, SpecializationType, EducationType } from "./enum";
import { Education } from "./education";

export class Specialization {
    specializationType: SpecializationType;
    employmentType: EmploymentType;
    paymentType: PaymentType;
    educationType: EducationType;
    paymentPrice: number;
    experience: number;
    recomendation: boolean;
}
