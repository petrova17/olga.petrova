import { EmploymentType, PaymentType } from "./enum";
import { Education } from "./education";

export class Specialization {
    name: string;
    employmentType: EmploymentType;
    paymentType: PaymentType;
    paymentPrice: number;
    experience: number;
    recomendation: boolean;
    education: Education
}
