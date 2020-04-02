import { Component } from '@angular/core';
import { DataService } from '../core/data.service';
import { DriverVacancy } from '../models/driverVacancy';
import { EmploymentType, PaymentType } from '../models/enum';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'show-add-vacancy',
    templateUrl: './show-vacancy.component.html'
})
export class ShowVacancyComponent {

    selectedVacancy: DriverVacancy;

    EmploymentType: typeof EmploymentType = EmploymentType;
    PaymentType: typeof PaymentType = PaymentType;

    constructor(private route: ActivatedRoute,
        private dataService: DataService) { }

    ngOnInit() {
        let vacancyId: number = parseInt(this.route.snapshot.params['id']);
        this.dataService.getDriverVacancyById(vacancyId)
            .subscribe(
                (data: DriverVacancy) => {
                    this.selectedVacancy = data;
                    console.log(this.selectedVacancy)
                },
                (err: any) => console.log(err),
                () => console.log("All done")
            );
    }
}
