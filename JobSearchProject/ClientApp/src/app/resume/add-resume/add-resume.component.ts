import { AuthorizeService } from '../../../api-authorization/authorize.service';
import { Status, SpecializationType } from '../../models/enum';
import { TrackerError } from '../../models/trackerError';
import { BabysitterVacancy } from '../../models/babysitterVacancy';
import { DataService } from '../../core/services/data.service';
import { OnInit, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { BabysitterResume } from '../../models/babysitterResume';
import { DriverResume } from '../../models/driverResume';

@Component({
  selector: 'app-add-resume',
  templateUrl: './add-resume.component.html',
  styleUrls: ['./add-resume.component.css']
})
export class AddResumeComponent implements OnInit {
    currentUserName: string;
    addResumeForm: FormGroup;

    get experiences(): FormArray {
        return this.addResumeForm.get('experiences') as FormArray;
    }

    babysitterResponsibilities: string[] = ['Cooking', 'Cleaning', 'Dog walking', 'Assisted with school homework', 'Put to bed'];

    constructor(private dataService: DataService,
        private authorizeService: AuthorizeService,
        private router: Router,
        private fb: FormBuilder) { }

    trackerError = new TrackerError();
       
    languages: {};
    specializations: {};
    employmentTypes: {};
    paymentTypes: {};
    educationTypes: {};
    specialityTypes: {};


    ngOnInit() {

        this.dataService.getEnum()
            .subscribe(
                (data: any) => {
                    this.languages = data[1];
                    this.specializations = data[0];
                    this.employmentTypes = data[3];
                    this.paymentTypes = data[2];
                    this.educationTypes = data[4];
                    this.specialityTypes = data[5];
                },
                (err: TrackerError) => {
                    this.trackerError.friendlyMessage = err.friendlyMessage;
                }
            );

        this.authorizeService.getUser()
            .pipe(map(u => u.name))
            .subscribe((data: string) => {
                this.currentUserName = data;
                console.log(data);
            });

        this.addResumeForm = this.fb.group({
            description: ['', Validators.required],
            age: ['', Validators.required],
            status: [''],
            top: [false],
            photo: [null],
            contactName: [''],
            drivingExperience: [''],
            specialization: this.buildSpecialization(),
            location: this.buildLocation(),
            specialChild: [false],
            nativeLanguage: [''],
            otherLanguagesList:[''],
            otherLanguages: [''],
            driverLicense: [false],
            foreignPassport: [false],
            travelWithFamily: [false],
            officialEmployment: [false],
            medicineBook: [false],
            ownChildren: [false],
            videoSurveillance: [false],
            responsibilitiesList: [''],
            responsibilities: [''],
            details: [''],
            education: this.buildEducation(),
            experiences: this.fb.array([ this.buildExperience() ])
        });

        this.addResumeForm.get('specialization.specializationType').valueChanges
            .subscribe(value => this.setValidationBySpecialization(value));

        console.log(this.addResumeForm);

    }
        
    setValidationBySpecialization(typeSpecialization: string): void {
        const drivingExperienceControl = this.addResumeForm.get('drivingExperience');
        const nativeLanguageControl = this.addResumeForm.get('nativeLanguage');
        const specialityControl = this.addResumeForm.get('education.specialityType');

        if (typeSpecialization === SpecializationType.Driver.toString()) {
            drivingExperienceControl.setValidators(Validators.required);
            nativeLanguageControl.clearValidators();
            specialityControl.clearValidators();

        } else {
            drivingExperienceControl.clearValidators();
            nativeLanguageControl.setValidators(Validators.required);
            specialityControl.setValidators(Validators.required);
        }
        drivingExperienceControl.updateValueAndValidity();
        nativeLanguageControl.updateValueAndValidity();
    }


    buildSpecialization(): FormGroup {
        return this.fb.group({
            specializationType: ['', Validators.required],
            employmentType: ['', Validators.required],
            paymentType: ['', Validators.required],
            paymentPrice: [''],
            educationType: ['', Validators.required],
            experience: ['']
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

    buildExperience(): FormGroup {
        return this.fb.group({
            from: [''],
            to: [''],
            title: [''],
            description: ['']
        })
    }

    addExperience() {
        this.experiences.push(this.buildExperience());
    }

    addResume() {
        const specializationControl = this.addResumeForm.get('specialization.specializationType');
        const responsibilitiesListValue = this.addResumeForm.get('responsibilitiesList').value;
        const otherLanguagesListValue = this.addResumeForm.get('otherLanguagesList').value;

        console.log(this.addResumeForm);
                
        if (this.addResumeForm.valid) {
            this.addResumeForm.patchValue({
                status: Status.Saved,
                contactName: this.currentUserName,
                responsibilities: responsibilitiesListValue
                    ? responsibilitiesListValue.join(',')
                    : responsibilitiesListValue,
                otherLanguages: otherLanguagesListValue
                    ? otherLanguagesListValue.join(',')
                    : otherLanguagesListValue
            });

            if (specializationControl.value == SpecializationType.Babysitter) {
                this.dataService.addBabysitterResume(this.addResumeForm.value)
                    .subscribe(
                        (data: BabysitterResume) => {
                            console.log(data);
                            this.router.navigate(['']);
                        },
                        (err: TrackerError) => {
                            this.trackerError.friendlyMessage = err.friendlyMessage;
                        }
                    );
            }
            if (specializationControl.value == SpecializationType.Driver) {
                this.dataService.addDriverResume(this.addResumeForm.value)
                    .subscribe(
                        (data: DriverResume) => {
                            console.log(data);
                            this.router.navigate(['']);
                        },
                        (err: TrackerError) => {
                            this.trackerError.friendlyMessage = err.friendlyMessage;
                        }
                    );
            }
            else {
                this.trackerError.friendlyMessage = "Add resume for this specialization is not implemented yet";
            }
        }
        else {
            this.trackerError.friendlyMessage = "Please fill all required fields";
        }
    }
}
