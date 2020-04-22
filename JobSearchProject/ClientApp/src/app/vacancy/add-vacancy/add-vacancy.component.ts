import { AuthorizeService } from '../../../api-authorization/authorize.service';
import { DriverVacancy } from '../../models/driverVacancy';
import { Status, SpecializationType } from '../../models/enum';
import { TrackerError } from '../../models/trackerError';
import { BabysitterVacancy } from '../../models/babysitterVacancy';
import { DataService } from '../../core/services/data.service';
import { OnInit, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-add-vacancy',
    templateUrl: './add-vacancy.component.html',
    styleUrls: ['./add-vacancy.component.css']
})
export class AddVacancyComponent implements OnInit {
    currentUserName: string;
    addVacancyForm: FormGroup;

    constructor(private dataService: DataService,
        private authorizeService: AuthorizeService,
        private router: Router,
        private fb: FormBuilder) { } 

    trackerError = new TrackerError();
    SpecializationType: typeof SpecializationType = SpecializationType;

    babysitterResponsibilities: string[] = ['Cooking', 'Cleaning', 'Dog walking', 'Assisted with school homework', 'Put to bed'];

    ngOnInit() {

        this.authorizeService.getUser()
            .pipe(map(u => u.name))
            .subscribe((data: string) => {
                this.currentUserName = data;
                console.log(data);
            });

        this.addVacancyForm = this.fb.group({
            description: ['', Validators.required],            
            ageFrom: ['', Validators.required],
            ageTo: ['', Validators.required],
            status: [''],
            top: [false],
            contactName: [''],
            drivingExperience: [''], 
            specialization: this.buildSpecialization(),
            location: this.buildLocation(),
            childNumber: [''],
            specialChild: [false],
            nativeLanguage: [''],
            otherLanguages: [''],
            driverLicense: [false],
            foreignPassport: [false],
            travelWithFamily: [false],
            officialEmployment: [false],
            medicineBook: [false],
            ownChildren: [false],
            pet: [false],           
            videoSurveillance: [false],
            responsibilitiesList: [''],
            responsibilities: [''],
            criminalRecord: [false],
            workingHours: [''],
            beginningOfWork: [''],
            details: [''],
            education: this.buildEducation()
        });

        this.addVacancyForm.get('specialization.specializationType').valueChanges
            .subscribe(value => this.setValidationBySpecialization(value));

    }

    setValidationBySpecialization(typeSpecialization: string): void {
        const drivingExperienceControl = this.addVacancyForm.get('drivingExperience');
        const childNumberControl = this.addVacancyForm.get('childNumber');
        const nativeLanguageControl = this.addVacancyForm.get('nativeLanguage');
        const specialityControl = this.addVacancyForm.get('education.specialityType');
               
        if (typeSpecialization === SpecializationType.Driver.toString()) {
            drivingExperienceControl.setValidators(Validators.required);
            childNumberControl.clearValidators();
            nativeLanguageControl.clearValidators();
            specialityControl.clearValidators();

        } else {
            drivingExperienceControl.clearValidators();
            childNumberControl.setValidators(Validators.required);
            nativeLanguageControl.setValidators(Validators.required);
            specialityControl.setValidators(Validators.required);
        }
        drivingExperienceControl.updateValueAndValidity();
        childNumberControl.updateValueAndValidity();
        nativeLanguageControl.updateValueAndValidity();
    }
    
    buildSpecialization(): FormGroup {
        return this.fb.group({
            specializationType: ['', Validators.required],
            employmentType: ['', Validators.required],
            paymentType: ['', Validators.required],
            paymentPrice: [''],
            experience: [''],
            educationType: ['', Validators.required],
        })
    }

    buildLocation(): FormGroup {
        return this.fb.group({
            country: ['', Validators.required],
            city: ['', Validators.required],
            region: [''],
            street: [''],
        })
    }

    buildEducation(): FormGroup {
        return this.fb.group({
            specialityType: [''],
            additionalEducation: [''],
        })
    }
 
    addVacancy() {
        const specializationControl = this.addVacancyForm.get('specialization.specializationType');
        const responsibilitiesListValue = this.addVacancyForm.get('responsibilitiesList').value;

        console.log(this.addVacancyForm);
        if (this.addVacancyForm.valid) {
            this.addVacancyForm.patchValue({
                status: Status.Saved,
                contactName: this.currentUserName,
                responsibilities: responsibilitiesListValue
                    ? responsibilitiesListValue.join(',')
                    : responsibilitiesListValue,
            });


            if (specializationControl.value == SpecializationType.Driver) {
                this.dataService.addDriverVacancy(this.addVacancyForm.value)
                    .subscribe(
                        (data: DriverVacancy) => {
                            console.log(data);
                            this.router.navigate(['/my-vacancy']);
                        },
                        (err: TrackerError) => {
                            this.trackerError.friendlyMessage = err.friendlyMessage;
                        }
                    );
            }
            if (specializationControl.value == SpecializationType.Babysitter) {
                this.dataService.addBabysitterVacancy(this.addVacancyForm.value)
                    .subscribe(
                        (data: BabysitterVacancy) => {
                            console.log(data);
                            this.router.navigate(['/my-vacancy']);
                        },
                        (err: TrackerError) => {
                            this.trackerError.friendlyMessage = err.friendlyMessage;
                        }
                    );
            }
            else {
                this.trackerError.friendlyMessage = "Add vacancy for this specialization is not implemented yet";
            }
       }
    }    
}

