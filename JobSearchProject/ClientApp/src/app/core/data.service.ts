import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DriverVacancy } from '../models/driverVacancy';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor(private http: HttpClient) { }

    getAllDriverVacancies(): Observable<DriverVacancy[]> {
        return this.http.get<DriverVacancy[]>('/api/DriverVacancies');
    }

    getDriverVacancyById(id: number): Observable<DriverVacancy> {
        return this.http.get<DriverVacancy>(`/api/DriverVacancies/${id}`);
    }

    addVacancy(newVacancy: DriverVacancy): Observable<DriverVacancy> {
        return this.http.post<DriverVacancy>('/api/DriverVacancies', newVacancy, {
            headers: new HttpHeaders({
                'Content-Type':'application/json'
            })
        });
    }
}
