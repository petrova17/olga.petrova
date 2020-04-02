import { Component, Inject } from '@angular/core';
import { NgForm, NgModel } from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { DriverVacancy } from '../models/driverVacancy';
import { DataService } from '../core/data.service';
import { AuthorizeService } from '../../api-authorization/authorize.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-vacancy',
    templateUrl: './add-vacancy.component.html',
    styleUrls: ['./add-vacancy.component.css']
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
        driverExperience: null,
        description: null,
        specialization: {
            name: null,
            employmentType: null,
            paymentType: null,
            paymentPrice: null,
            experience: null,
            recomendation: null,
            education: {
                speciality: null,
                additionalEducation: null
            }
        },
        location: {
            country: null,
            city: null,
            region: null,
            street: null
        }
    };

    addVacancy(form: NgModel) {    

        this.getName();
        this.dataService.addVacancy(this.vacancy)
            .subscribe(
                (data: DriverVacancy) => console.log(data),
                (err: any) => {
                    console.log(err);
                    throw err;
                }
        );
        // To be updated
        //this.router.navigate(['']);
    }
}

