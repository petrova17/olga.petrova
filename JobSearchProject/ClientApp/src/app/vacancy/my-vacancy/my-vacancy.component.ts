import { Component, OnInit } from '@angular/core';
import { DriverVacancy } from '../../models/driverVacancy';
import { TrackerError } from '../../models/trackerError';
import { DataService } from '../../core/data.service';
import { EmploymentType, PaymentType, EducationType, SpecializationType } from '../../models/enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-vacancy',
  templateUrl: './my-vacancy.component.html',
  styleUrls: ['./my-vacancy.component.css']
})
export class MyVacancyComponent implements OnInit {
    allDriversVacancy: DriverVacancy[];
    trackerError = new TrackerError();

    EmploymentType: typeof EmploymentType = EmploymentType;
    PaymentType: typeof PaymentType = PaymentType;
    EducationType: typeof EducationType = EducationType;
    SpecializationType: typeof SpecializationType = SpecializationType;

    constructor(private dataService: DataService,
        private router: Router) { }

    ngOnInit() {
        this.dataService.getDriverVacancies()
            .subscribe(
                (data: DriverVacancy[]) => {
                this.allDriversVacancy = data;
                },
                (err: TrackerError) => {
                    this.trackerError.friendlyMessage = err.friendlyMessage;
                },
                () => console.log("All done")
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
                    },
                    (err: any) => {
                        console.log(err);
                        throw err;
                    }
        );
    }

}
