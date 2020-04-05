import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DriverVacancy } from '../models/driverVacancy';
import { catchError, retry } from 'rxjs/operators';
import { TrackerError } from '../models/trackerError';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor(private http: HttpClient) { }

    getAllDriverVacancies(): Observable<DriverVacancy[] | TrackerError> {
        return this.http.get<DriverVacancy[]>('/api/DriverVacancies/');
    }    

    getDriverVacancyById(id: number): Observable<DriverVacancy> {
        return this.http.get<DriverVacancy>(`/api/DriverVacancies/${id}`);
    }

    addVacancy(newVacancy: DriverVacancy): Observable<DriverVacancy> {
        return this.http.post<DriverVacancy>('/api/DriverVacancies', newVacancy);
    }
}
