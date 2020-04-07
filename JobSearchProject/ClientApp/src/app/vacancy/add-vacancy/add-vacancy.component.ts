import { Component, Inject, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataService } from '../../core/data.service';
import { AuthorizeService } from '../../../api-authorization/authorize.service';
import { DriverVacancy } from '../../models/driverVacancy';
import { Status } from '../../models/enum';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { TrackerError } from '../../models/trackerError';

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
            drivingExperience: ['', Validators.required],
            //driverVacancy: this.buildDriverVacancy(),
            specialization: this.buildSpecialization(),
            location: this.buildLocation()
        });

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
 
    addVacancy() {
        if (this.addVacancyForm.valid) {
            this.addVacancyForm.patchValue({
                status: Status.Saved,
                contactName: this.currentUserName
            });

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
    }    
}

