import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/data.service';
import { DriverVacancy } from '../models/driverVacancy';
import { EmploymentType, PaymentType } from '../models/enum';
import { TrackerError } from '../models/trackerError';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    
    trackerError: TrackerError = {
        errorNumber: null,
        message: null,
        friendlyMessage: null
    };
    allDriversVacancy: DriverVacancy[];
    EmploymentType : typeof EmploymentType = EmploymentType;

    PaymentType: typeof PaymentType = PaymentType;

    constructor(private dataService: DataService) { }

    ngOnInit() {
        console.log('We are on this page!!!');

        this.dataService.getDriverVacancies()
            .subscribe(
                (data: DriverVacancy[]) => this.allDriversVacancy = data,
                (err: TrackerError) => {
                    this.trackerError.friendlyMessage = err.friendlyMessage;
                    console.log(err.errorNumber);
                    console.log(err.message);
                    console.log(err.friendlyMessage);
                },
                () => console.log("All done")
        );

        console.log(this.trackerError);
    }
}
