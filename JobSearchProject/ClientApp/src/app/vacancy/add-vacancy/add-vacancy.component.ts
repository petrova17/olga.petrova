import { Component, Inject, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataService } from '../../core/data.service';
import { AuthorizeService } from '../../../api-authorization/authorize.service';
import { DriverVacancy } from '../../models/driverVacancy';
import { Status, SpecializationType } from '../../models/enum';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { TrackerError } from '../../models/trackerError';
import { BabysitterVacancy } from '../../models/babysitterVacancy';

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
            contactName: [''],
            drivingExperience: [''], 
            specialization: this.buildSpecialization(),
            location: this.buildLocation(),
            childNumber: [''],
            specialChild: [''],
            nativeLanguage: [''],
            otherLanguages: [''],
            driverLicense: [''],
            foreignPassport: [''],
            travelWithFamily: [''],
            officialEmployment: [''],
            medicineBook: [''],
            ownChildren: [''],
            pet: [''],           
            videoSurveillance: [''],
            responsibilities: [''],
            criminalRecord: [''],
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
        const specialityControl = this.addVacancyForm.get('education.speciality');
               
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

    buildDriverVacancy(): FormGroup {
        return this.fb.group({
            drivingExperience: ['', Validators.required],
        })
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
            speciality: [''],
            additionalEducation: [''],
        })
    }
 
    addVacancy() {
        const specializationControl = this.addVacancyForm.get('specialization.specializationType');
        console.log(this.addVacancyForm);
        if (this.addVacancyForm.valid) {
            this.addVacancyForm.patchValue({
                status: Status.Saved,
                contactName: this.currentUserName
            });


            if (specializationControl.value == SpecializationType.Driver) {
                this.dataService.addDriverVacancy(this.addVacancyForm.value)
                    .subscribe(
                        (data: DriverVacancy) => {
                            console.log(data);
                            this.router.navigate(['']);
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
                            this.router.navigate(['']);
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

