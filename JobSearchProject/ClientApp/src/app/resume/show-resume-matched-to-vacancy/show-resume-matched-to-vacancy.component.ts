import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { BabysitterResume } from '../../models/babysitterResume';
import { TrackerError } from '../../models/trackerError';
import { EmploymentType, PaymentType, EducationType, SpecializationType, EducationSpecialityType, LanguageType } from '../../models/enum';
import { DriverResume } from '../../models/driverResume';

@Component({
  selector: 'app-show-resume-matched-to-vacancy',
  templateUrl: './show-resume-matched-to-vacancy.component.html',
  styleUrls: ['./show-resume-matched-to-vacancy.component.css']
})
export class ShowResumeMatchedToVacancyComponent implements OnInit {

    allBabysitterResumeMatched: BabysitterResume[];
    allDriverResumeMatched: DriverResume[];
    trackerError = new TrackerError();

    EmploymentType: typeof EmploymentType = EmploymentType;  
    PaymentType: typeof PaymentType = PaymentType;
    EducationType: typeof EducationType = EducationType;
    SpecializationType: typeof SpecializationType = SpecializationType;
    EducationSpecialityType: typeof EducationSpecialityType = EducationSpecialityType;
    LanguageType: typeof LanguageType = LanguageType;

    isBabysitterResumeListEmpty: boolean;
    isDriverResumeListEmpty: boolean;

    showAlert: boolean;

    specialization: string;

    constructor(private route: ActivatedRoute,
        private dataService: DataService,
        private router: Router) { }

    ngOnInit() {
        this.showAlert = false;
        this.isBabysitterResumeListEmpty = false;

        let vacancyId: number = parseInt(this.route.snapshot.params['id']);
        this.specialization = this.route.snapshot.queryParamMap.get('spec');

        if (this.specialization == 'babysitter') {
            this.dataService.getBabysitterResumesMatched(vacancyId)
                .subscribe(
                    (data: BabysitterResume[]) => {
                        this.allBabysitterResumeMatched = data;
                        if (this.allBabysitterResumeMatched.length === 0) {
                            this.isBabysitterResumeListEmpty = true;
                            this.showAlert = true;
                        };
                    },
                    (err: TrackerError) => {
                        this.trackerError.friendlyMessage = err.friendlyMessage;
                    }
                );
        }

        if (this.specialization == 'driver') {
            this.dataService.getDriverResumesMatched(vacancyId)
                .subscribe(
                    (data: DriverResume[]) => {
                        this.allDriverResumeMatched = data;
                        if (this.allDriverResumeMatched.length === 0) {
                            this.isDriverResumeListEmpty = true;
                            this.showAlert = true;
                        };
                    },
                    (err: TrackerError) => {
                        this.trackerError.friendlyMessage = err.friendlyMessage;
                    }
                );
        }
  }
     
}
