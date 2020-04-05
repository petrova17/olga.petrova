import { Component, Inject, Input } from '@angular/core';
import { DriverVacancy } from '../../../models/driverVacancy';
import { NgForm, ControlContainer } from '@angular/forms';
@Component({
    selector: 'app-add-driver-vacancy',
    templateUrl: './add-driver-vacancy.component.html'
})
export class AddDriverVacancyComponent {
    @Input() vacancy: DriverVacancy;
    @Input() addVacancyForm: NgForm;
}
