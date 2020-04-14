import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmploymentType, PaymentType, EducationType, SpecializationType, EducationSpecialityType, LanguageType } from '../../models/enum';
import { DriverVacancy } from '../../models/driverVacancy';
import { TrackerError } from '../../models/trackerError';
import { BabysitterVacancy } from '../../models/babysitterVacancy';
import { DataService } from '../../core/services/data.service';

@Component({
    selector: 'show-add-vacancy',
    templateUrl: './show-vacancy.component.html'
})
export class ShowVacancyComponent {
    
    EmploymentType: typeof EmploymentType = EmploymentType;
    PaymentType: typeof PaymentType = PaymentType;
    EducationType: typeof EducationType = EducationType;

    SpecializationType: typeof SpecializationType = SpecializationType;
    EducationSpecialityType: typeof EducationSpecialityType = EducationSpecialityType;
    LanguageType: typeof LanguageType = LanguageType;

    trackerError = new TrackerError();

    specialization: string;

    constructor(private route: ActivatedRoute,
        private dataService: DataService,
        private router: Router) { }

    
    selectedDriverVacancy = new DriverVacancy();
    selectedBabysitterVacancy = new BabysitterVacancy();

    ngOnInit() {
        let vacancyId: number = parseInt(this.route.snapshot.params['id']);
        this.specialization = this.route.snapshot.queryParamMap.get('spec');
                       
        if (this.specialization == 'driver') {
            this.dataService.getDriverVacancy(vacancyId)
                .subscribe(
                    (data: DriverVacancy) => {
                        this.selectedDriverVacancy = data;
                    },
                    (err: TrackerError) => {
                        this.trackerError.friendlyMessage = err.friendlyMessage;
                    }
                );
        }
        if (this.specialization == 'babysitter') {
            this.dataService.getBabysitterVacancy(vacancyId)
            .subscribe(
                (data: BabysitterVacancy) => {
                    this.selectedBabysitterVacancy = data;
                },
                (err: TrackerError) => {
                    this.trackerError.friendlyMessage = err.friendlyMessage;
                }
            );
        }        
    }
    
    onBack(): void {
        this.router.navigate(['']);
    }
}
