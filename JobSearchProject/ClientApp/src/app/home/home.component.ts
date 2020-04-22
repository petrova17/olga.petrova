import { Component, OnInit } from '@angular/core';
import { DriverVacancy } from '../models/driverVacancy';
import { EmploymentType, PaymentType, SpecializationType, EducationType, LanguageType } from '../models/enum';
import { TrackerError } from '../models/trackerError';
import { BabysitterVacancy } from '../models/babysitterVacancy';
import { DataService } from '../core/services/data.service';
import { BabysitterResume } from '../models/babysitterResume';

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
    allBabysitterResume: BabysitterResume[];
 
    EmploymentType : typeof EmploymentType = EmploymentType;
    PaymentType: typeof PaymentType = PaymentType;
    SpecializationType: typeof SpecializationType = SpecializationType;
    EducationType: typeof EducationType = EducationType;
    LanguageType: typeof LanguageType = LanguageType;

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

        this.dataService.getBabysitterResumes()
            .subscribe(
                (data: BabysitterResume[]) => {
                    this.allBabysitterResume = data.filter(r => r.top === true);
                },
                (err: TrackerError) => {
                    this.trackerError.friendlyMessage = err.friendlyMessage;
                }
            );
    }
}
