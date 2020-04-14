import { Component, OnInit } from '@angular/core';
import { DriverVacancy } from '../../models/driverVacancy';
import { TrackerError } from '../../models/trackerError';
import { EmploymentType, PaymentType, EducationType, SpecializationType, EducationSpecialityType, LanguageType } from '../../models/enum';
import { Router } from '@angular/router';
import { BabysitterVacancy } from '../../models/babysitterVacancy';
import { map } from 'rxjs/operators';
import { AuthorizeService } from '../../../api-authorization/authorize.service';
import { DataService } from '../../core/services/data.service';

@Component({
    selector: 'app-my-vacancy',
    templateUrl: './my-vacancy.component.html',
    styleUrls: ['./my-vacancy.component.css']
})
export class MyVacancyComponent implements OnInit {

    currentUserName: string;
    allDriversVacancy: DriverVacancy[];
    allBabysitterVacancy: BabysitterVacancy[];

    trackerError = new TrackerError();
    showAlert: boolean;
    isDriverVacancyListEmpty: boolean;
    isBabysitterVacancyListEmpty: boolean;

    EmploymentType: typeof EmploymentType = EmploymentType;
    PaymentType: typeof PaymentType = PaymentType;
    EducationType: typeof EducationType = EducationType;
    SpecializationType: typeof SpecializationType = SpecializationType;
    EducationSpecialityType: typeof EducationSpecialityType = EducationSpecialityType;
    LanguageType: typeof LanguageType = LanguageType;

    constructor(private authorizeService: AuthorizeService,
        private dataService: DataService,
        private router: Router) { }
    
    ngOnInit() {
        this.showAlert = false;
        this.isDriverVacancyListEmpty = false;
        this.isBabysitterVacancyListEmpty = false;

        this.authorizeService.getUser()
            .pipe(map(u => u.name))
            .subscribe((data: string) => {
                this.currentUserName = data;
            });

        this.dataService.getDriverVacancies()
            .subscribe(
                (data: DriverVacancy[]) => {

                    this.allDriversVacancy = data.filter(r => r.contactName === this.currentUserName);
                    if (this.allDriversVacancy.length === 0) {
                        this.isDriverVacancyListEmpty = true;
                    };
                },
                (err: TrackerError) => {
                    this.trackerError.friendlyMessage = err.friendlyMessage;
                }
            );

        this.dataService.getBabysitterVacancies()
            .subscribe(
                (data: BabysitterVacancy[]) => {

                    this.allBabysitterVacancy = data.filter(r => r.contactName === this.currentUserName);
                    if (this.allBabysitterVacancy.length === 0) {
                        this.isBabysitterVacancyListEmpty = true;

                        this.showAlert = (this.isDriverVacancyListEmpty && this.isBabysitterVacancyListEmpty) ? true : false;
                    };
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
                        this.isDriverVacancyListEmpty = true;
                        this.showAlert = (this.isDriverVacancyListEmpty && this.isBabysitterVacancyListEmpty) ? true : false;
                    };
                },
                (err: any) => {
                    console.log(err);
                    throw err;
                }
            );
    }

    deleteBabysitterVacancy(id: number) {
        this.dataService.deleteBabysitterVacancy(id)
            .subscribe(
                (data: BabysitterVacancy) => {
                    let index: number = this.allBabysitterVacancy.findIndex(vacancy => vacancy.id === id);
                    this.allBabysitterVacancy.splice(index, 1);

                    if (this.allBabysitterVacancy.length === 0) {
                        this.isBabysitterVacancyListEmpty = true;
                        this.showAlert = (this.isDriverVacancyListEmpty && this.isBabysitterVacancyListEmpty) ? true : false;
                    };
                },
                (err: any) => {
                    console.log(err);
                    throw err;
                }
            );
    }
}
