import { Component, OnInit } from '@angular/core';
import { DriverVacancy } from '../models/driverVacancy';
import { EmploymentType, PaymentType, SpecializationType, EducationType, LanguageType } from '../models/enum';
import { TrackerError } from '../models/trackerError';
import { BabysitterVacancy } from '../models/babysitterVacancy';
import { DataService } from '../core/services/data.service';
import { BabysitterResume } from '../models/babysitterResume';
import { DriverResume } from '../models/driverResume';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

    trackerError = new TrackerError();
    allDriversVacancy: DriverVacancy[];
    allBabysitterVacancy: BabysitterVacancy[];
    allBabysitterResume: BabysitterResume[];
    allDriverResume: DriverResume[];
 
    EmploymentType : typeof EmploymentType = EmploymentType;
    PaymentType: typeof PaymentType = PaymentType;
    SpecializationType: typeof SpecializationType = SpecializationType;
    EducationType: typeof EducationType = EducationType;
    LanguageType: typeof LanguageType = LanguageType;

    constructor(private dataService: DataService) { }
     
    ngOnInit() { 
        this.trackerError.friendlyMessage = null;

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

        this.dataService.getDriverResumes()
            .subscribe(
                (data: DriverResume[]) => {
                    this.allDriverResume = data.filter(r => r.top === true);
                },
                (err: TrackerError) => {
                    this.trackerError.friendlyMessage = err.friendlyMessage;
                }
            );
    }
}
