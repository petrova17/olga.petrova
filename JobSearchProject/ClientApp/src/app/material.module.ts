import { NgModule } from '@angular/core';
import {
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatListModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatListModule
    ],
    exports: [
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatListModule
    ],
    providers: [MatDatepickerModule, MatSelectModule],
})

export class MaterialModule { }
