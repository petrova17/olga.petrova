import { Component, Inject } from '@angular/core';
import { NgForm, NgModel, ControlContainer } from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataService } from '../../core/data.service';
import { AuthorizeService } from '../../../api-authorization/authorize.service';
import { DriverVacancy } from '../../models/driverVacancy';
import { Status } from '../../models/enum';

@Component({
    selector: 'app-add-vacancy',
    templateUrl: './add-vacancy.component.html',
    styleUrls: ['./add-vacancy.component.css'],

    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class AddVacancyComponent {
    constructor(private dataService: DataService,
        private authorizeService: AuthorizeService,
        private router: Router) { }
    
    getName() {
        let value = this.authorizeService.getUser()
            .pipe(map(u => u.name))
            .subscribe((data: string) => {
                this.vacancy.contactName = data;
                console.log(data);
            });
        return value;
    }

    vacancy: DriverVacancy = {
        ageFrom: null,
        ageTo: null,
        status: null,
        contactName: null,
        drivingExperience: null,
        description: null,
        specialization: {
            specializationType: null,
            employmentType: null,
            paymentType: null,
            paymentPrice: null,
            educationType: null,
            experience: null,
            recomendation: null
        },
        location: {
            country: null,
            city: null,
            region: null,
            street: null
        }
    };

    addVacancy(form: NgModel) {
        if (form.valid) {
            this.getName();
            this.vacancy.status = Status.Saved;
            this.dataService.addVacancy(this.vacancy)
                .subscribe(
                    (data: DriverVacancy) => console.log(data),
                    (err: any) => {
                        console.log(err);
                        throw err;
                    }
                );
            // To be updated
            this.router.navigate(['']);
        }

        //this.router.navigate(['']);
    }
}

