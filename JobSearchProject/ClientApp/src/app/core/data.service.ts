import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { DriverVacancy } from '../models/driverVacancy';
import { catchError, tap, map, retry } from 'rxjs/operators';
import { TrackerError } from '../models/trackerError';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor(private http: HttpClient) { }

    getDriverVacancies(): Observable<DriverVacancy[] | TrackerError> {
        return this.http.get<DriverVacancy[]>('/api/DriverVacancies/');
    }    

    getDriverVacancy(id: number): Observable<DriverVacancy> {
        return this.http.get<DriverVacancy>(`/api/DriverVacancies/${id}`);
    }

    addDriverVacancy(newVacancy: DriverVacancy): Observable<DriverVacancy> {
        return this.http.post<DriverVacancy>('/api/DriverVacancies', newVacancy);
    }

    deleteDriverVacancy(id: number): Observable<DriverVacancy> {
        return this.http.delete<DriverVacancy>(`/api/DriverVacancies/${id}`);
    }
}
