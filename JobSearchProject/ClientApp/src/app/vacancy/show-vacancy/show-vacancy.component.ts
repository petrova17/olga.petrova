import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../core/data.service';
import { EmploymentType, PaymentType, EducationType, SpecializationType } from '../../models/enum';
import { DriverVacancy } from '../../models/driverVacancy';
import { TrackerError } from '../../models/trackerError';

@Component({
    selector: 'show-add-vacancy',
    templateUrl: './show-vacancy.component.html'
})
export class ShowVacancyComponent {
    
    EmploymentType: typeof EmploymentType = EmploymentType;
    PaymentType: typeof PaymentType = PaymentType;
    EducationType: typeof EducationType = EducationType;

    trackerError = new TrackerError();

    constructor(private route: ActivatedRoute,
        private dataService: DataService,
        private router: Router) { }

    
    selectedVacancy = new DriverVacancy();

    ngOnInit() {
        let vacancyId: number = parseInt(this.route.snapshot.params['id']);
               
        this.dataService.getDriverVacancy(vacancyId)
            .subscribe(
                (data: DriverVacancy) => {
                    this.displayDriverVacancy(data);
                },
                (err: TrackerError) => {
                    this.trackerError.friendlyMessage = err.friendlyMessage;
                },
                () => console.log("All done")
                    
            );
    }

    displayDriverVacancy(vacancy: DriverVacancy) {
        this.selectedVacancy = vacancy;
    }

    onBack(): void {
        this.router.navigate(['']);
    }
}
