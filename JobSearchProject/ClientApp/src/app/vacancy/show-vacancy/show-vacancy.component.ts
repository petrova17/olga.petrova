import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../core/data.service';
import { EmploymentType, PaymentType, EducationType } from '../../models/enum';
import { DriverVacancy } from '../../models/driverVacancy';

@Component({
    selector: 'show-add-vacancy',
    templateUrl: './show-vacancy.component.html'
})
export class ShowVacancyComponent {
    
    selectedVacancy: DriverVacancy = {
    ageFrom: null,
    ageTo: null,
    status: null,
    contactName: null,
    drivingExperience: null,
    description: null,
    specialization: {
        specializationType: null,
        employmentType: null,
        paymentType: null,
        paymentPrice: null,
        educationType: null,
        experience: null,
        recomendation: null,
    },
    location: {
        country: null,
        city: null,
        region: null,
        street: null
    }
};

    EmploymentType: typeof EmploymentType = EmploymentType;
    PaymentType: typeof PaymentType = PaymentType;
    EducationType: typeof EducationType = EducationType;

    constructor(private route: ActivatedRoute,
        private dataService: DataService) { }

    ngOnInit() {
        let vacancyId: number = parseInt(this.route.snapshot.params['id']);
        this.dataService.getDriverVacancyById(vacancyId)
            .subscribe(
                (data: DriverVacancy) => {
                    this.selectedVacancy = data;
                    console.log(this.selectedVacancy)
                },
                (err: any) => console.log(err),
                () => console.log("All done")
            );
    }
}
