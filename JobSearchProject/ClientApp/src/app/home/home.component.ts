import { Component } from '@angular/core';
import { DataService } from '../core/data.service';
import { DriverVacancy } from '../models/driverVacancy';
import { EmploymentType, PaymentType } from '../models/enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

    allDriversVacancy: DriverVacancy[];
    EmploymentType : typeof
    EmploymentType = EmploymentType;

    PaymentType: typeof PaymentType = PaymentType;

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.dataService.getAllDriverVacancies()
            .subscribe(
                (data: DriverVacancy[]) => this.allDriversVacancy = data,
                (err: any) => console.log(err),
                () => console.log("All done")
            );
    }
}
