import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
        private dataService: DataService,
        private router: Router) { }

    ngOnInit() {
        let vacancyId: number = parseInt(this.route.snapshot.params['id']);
       
        this.dataService.getDriverVacancy(vacancyId)
            .subscribe(
                {
                    next: (data: DriverVacancy) => {
                        this.displayDriverVacancy(data),
                            console.log(data)
                    },
                    error: err => console.log(err)
                }
            );
    }

    displayDriverVacancy(vacancy: DriverVacancy) {
        this.selectedVacancy = vacancy;
    }

    onBack(): void {
        this.router.navigate(['']);
    }
}
