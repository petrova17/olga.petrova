import { Component, OnChanges } from '@angular/core';
import { DataService } from '../core/data.service';
import { DriverVacancy } from '../models/driverVacancy';
import { EmploymentType, PaymentType } from '../models/enum';
import { TrackerError } from '../models/trackerError';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnChanges {
    ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
        throw new Error("Method not implemented.");
    }

    trackerError: TrackerError = {
        errorNumber: null,
        message: null,
        friendlyMessage: null
    };
    allDriversVacancy: DriverVacancy[];
    EmploymentType : typeof
    EmploymentType = EmploymentType;

    PaymentType: typeof PaymentType = PaymentType;

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.dataService.getAllDriverVacancies()
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
