import { Component, OnInit } from '@angular/core';
import { DriverVacancy } from '../../models/driverVacancy';
import { TrackerError } from '../../models/trackerError';
import { EmploymentType, PaymentType, EducationType, SpecializationType, EducationSpecialityType, LanguageType } from '../../models/enum';
import { Router } from '@angular/router';
import { BabysitterVacancy } from '../../models/babysitterVacancy';
import { map } from 'rxjs/operators';
import { AuthorizeService } from '../../../api-authorization/authorize.service';
import { DataService } from '../../core/services/data.service';
import { BabysitterResume } from '../../models/babysitterResume';

@Component({
  selector: 'app-my-resume',
  templateUrl: './my-resume.component.html',
  styleUrls: ['./my-resume.component.css']
})
export class MyResumeComponent implements OnInit {

    currentUserName: string;
    allBabysitterResume: BabysitterResume[];

    trackerError = new TrackerError();
    showAlert: boolean;
    isBabysitterResumeListEmpty: boolean;

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
        this.isBabysitterResumeListEmpty = false;

        this.authorizeService.getUser()
            .pipe(map(u => u.name))
            .subscribe((data: string) => {
                this.currentUserName = data;
                console.log(this.currentUserName);
            });

        this.dataService.getBabysitterResumes()
            .subscribe(
                (data: BabysitterResume[]) => {
                    this.allBabysitterResume = data.filter(r => r.contactName === this.currentUserName);
                    if (this.allBabysitterResume.length === 0) {
                        this.isBabysitterResumeListEmpty = true;
                    };
                },
                (err: TrackerError) => {
                    this.trackerError.friendlyMessage = err.friendlyMessage;
                }
            );
    }

    onBack(): void {
        this.router.navigate(['profile']);
    }

    deleteBabysitterResume(id: number) {
        this.dataService.deleteBabysitterResume(id)
            .subscribe(
                (data: BabysitterResume) => {
                    let index: number = this.allBabysitterResume.findIndex(vacancy => vacancy.id === id);
                    this.allBabysitterResume.splice(index, 1);

                    if (this.allBabysitterResume.length === 0) {
                        this.isBabysitterResumeListEmpty = true;
                        this.showAlert = (this.isBabysitterResumeListEmpty) ? true : false;
                    };
                },
                (err: any) => {
                    console.log(err);
                    throw err;
                }
            );
    }

}
