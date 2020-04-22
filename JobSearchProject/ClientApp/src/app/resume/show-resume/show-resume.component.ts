import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmploymentType, PaymentType, EducationType, SpecializationType, EducationSpecialityType, LanguageType } from '../../models/enum';
import { TrackerError } from '../../models/trackerError';
import { DataService } from '../../core/services/data.service';
import { BabysitterResume } from '../../models/babysitterResume';

@Component({
  selector: 'app-show-resume',
  templateUrl: './show-resume.component.html',
  styleUrls: ['./show-resume.component.css']
})
export class ShowResumeComponent implements OnInit {

    EmploymentType: typeof EmploymentType = EmploymentType;
    PaymentType: typeof PaymentType = PaymentType;
    EducationType: typeof EducationType = EducationType;

    SpecializationType: typeof SpecializationType = SpecializationType;
    EducationSpecialityType: typeof EducationSpecialityType = EducationSpecialityType;
    LanguageType: typeof LanguageType = LanguageType;

    trackerError = new TrackerError();

    specialization: string;
    otherLanguages: {};

    constructor(private route: ActivatedRoute,
        private dataService: DataService,
        private router: Router) { }

    selectedBabysitterResume = new BabysitterResume();

    ngOnInit() {
        let vacancyId: number = parseInt(this.route.snapshot.params['id']);
        this.specialization = this.route.snapshot.queryParamMap.get('spec');
                
        if (this.specialization == 'babysitter') {
            this.dataService.getBabysitterResume(vacancyId)
                .subscribe(
                    (data: BabysitterResume) => {
                        this.selectedBabysitterResume = data;
                        this.otherLanguages = data.otherLanguages.split(',').map(Number);
                    },
                    (err: TrackerError) => {
                        this.trackerError.friendlyMessage = err.friendlyMessage;
                    }
                );
        }       
    }

    onBack(): void {
        this.router.navigate(['']);
    }
}
