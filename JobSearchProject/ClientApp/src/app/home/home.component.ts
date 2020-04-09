import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/data.service';
import { DriverVacancy } from '../models/driverVacancy';
import { EmploymentType, PaymentType } from '../models/enum';
import { TrackerError } from '../models/trackerError';
import { BabysitterVacancy } from '../models/babysitterVacancy';

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
    allBabysitterVacancy: BabysitterVacancy[];

    EmploymentType : typeof EmploymentType = EmploymentType;
    PaymentType: typeof PaymentType = PaymentType;

    constructor(private dataService: DataService) { }

    ngOnInit() {
        
        this.dataService.getDriverVacancies()
            .subscribe(
                (data: DriverVacancy[]) => {
                    this.allDriversVacancy = data.filter(r => r.top === true);                    
                },
                (err: TrackerError) => {
                    this.trackerError.friendlyMessage = err.friendlyMessage;
                }
        );

        this.dataService.getBabysitterVacancies()
            .subscribe(
                (data: BabysitterVacancy[]) => {
                    this.allBabysitterVacancy = data.filter(r => r.top === true);  
                },
                (err: TrackerError) => {
                    this.trackerError.friendlyMessage = err.friendlyMessage;
                }
            );
    }
}
