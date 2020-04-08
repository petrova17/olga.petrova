import { Component, OnInit } from '@angular/core';
import { DriverVacancy } from '../../models/driverVacancy';
import { TrackerError } from '../../models/trackerError';
import { DataService } from '../../core/data.service';
import { EmploymentType, PaymentType, EducationType, SpecializationType, EducationSpecialityType, LanguageType } from '../../models/enum';
import { Router } from '@angular/router';
import { BabysitterVacancy } from '../../models/babysitterVacancy';

@Component({
  selector: 'app-my-vacancy',
  templateUrl: './my-vacancy.component.html',
  styleUrls: ['./my-vacancy.component.css']
})
export class MyVacancyComponent implements OnInit {
    allDriversVacancy: DriverVacancy[];
    allBabysitterVacancy: BabysitterVacancy[];

    trackerError = new TrackerError();
    showAlert: boolean;

    EmploymentType: typeof EmploymentType = EmploymentType;
    PaymentType: typeof PaymentType = PaymentType;
    EducationType: typeof EducationType = EducationType;
    SpecializationType: typeof SpecializationType = SpecializationType;
    EducationSpecialityType: typeof EducationSpecialityType = EducationSpecialityType;
    LanguageType: typeof LanguageType = LanguageType;

    constructor(private dataService: DataService,
        private router: Router) { }

    ngOnInit() {
        this.showAlert = false;
        this.dataService.getDriverVacancies()
            .subscribe(
                (data: DriverVacancy[]) => {
                    
                    this.allDriversVacancy = data;
                    //if (this.allDriversVacancy.length === 0) {
                    //    this.showAlert = true;
                    //};
                },
                (err: TrackerError) => {
                    this.trackerError.friendlyMessage = err.friendlyMessage;
                }
        );

        this.dataService.getBabysitterVacancy()
            .subscribe(
                (data: BabysitterVacancy[]) => {

                    this.allBabysitterVacancy = data;
                    //if (this.allDriversVacancy.length === 0) {
                    //    this.showAlert = true;
                    //};
                },
                (err: TrackerError) => {
                    this.trackerError.friendlyMessage = err.friendlyMessage;
                }
            );   
    }

    onBack(): void {
        this.router.navigate(['']);
    }

    deleteVacancy(id: number) {
        this.dataService.deleteDriverVacancy(id)
            .subscribe(
                (data: DriverVacancy) => {
                    let index: number = this.allDriversVacancy.findIndex(vacancy => vacancy.id === id);
                    this.allDriversVacancy.splice(index, 1);

                    if (this.allDriversVacancy.length === 0) {
                        this.showAlert = true;
                    };
                    },
                    (err: any) => {
                        console.log(err);
                        throw err;
                    }
        );
    }

}
