import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { DriverVacancy } from '../models/driverVacancy';
import { TrackerError } from '../models/trackerError';
import { BabysitterVacancy } from '../models/babysitterVacancy';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor(private http: HttpClient) { }

    getDriverVacancies(): Observable<DriverVacancy[] | TrackerError> {
        return this.http.get<DriverVacancy[]>('/api/DriverVacancies/');
    }    

    getBabysitterVacancy(): Observable<BabysitterVacancy[] | TrackerError> {
        return this.http.get<BabysitterVacancy[]>('/api/BabysitterVacancies');
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

    addBabysitterVacancy(newVacancy: BabysitterVacancy): Observable<BabysitterVacancy> {
        return this.http.post<BabysitterVacancy>('/api/BabysitterVacancies', newVacancy);
    }
}
