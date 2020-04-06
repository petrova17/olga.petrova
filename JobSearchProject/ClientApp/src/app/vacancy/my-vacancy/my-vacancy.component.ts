import { Component, OnInit } from '@angular/core';
import { DriverVacancy } from '../../models/driverVacancy';
import { TrackerError } from '../../models/trackerError';
import { DataService } from '../../core/data.service';
import { EmploymentType, PaymentType, EducationType } from '../../models/enum';
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

    constructor(private dataService: DataService,
        private router: Router) { }

    ngOnInit() {
        this.dataService.getDriverVacancies()
            .subscribe(
                (data: DriverVacancy[]) => {
                this.allDriversVacancy = data;
                    //console.log(this.allDriversVacancy);
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

        
        //    //To be updated
        //    this.router.navigate(['']);
        }

}
