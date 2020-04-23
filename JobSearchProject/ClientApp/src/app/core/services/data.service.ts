import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DriverVacancy } from '../../models/driverVacancy';
import { TrackerError } from '../../models/trackerError';
import { BabysitterVacancy } from '../../models/babysitterVacancy';
import { Observable } from 'rxjs';
import { BabysitterResume } from '../../models/babysitterResume';
import { DriverResume } from '../../models/driverResume';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor(private http: HttpClient) { }

    getDriverVacancies(): Observable<DriverVacancy[] | TrackerError> {
        return this.http.get<DriverVacancy[]>('/api/DriverVacancies/');
    }    

    getBabysitterVacancies(): Observable<BabysitterVacancy[] | TrackerError> {
        return this.http.get<BabysitterVacancy[]>('/api/BabysitterVacancies/');
    }

    getDriverVacancy(id: number): Observable<DriverVacancy | TrackerError> {
        return this.http.get<DriverVacancy>(`/api/DriverVacancies/${id}`);
    }

    getBabysitterVacancy(id: number): Observable<BabysitterVacancy | TrackerError> {
        return this.http.get<BabysitterVacancy>(`/api/BabysitterVacancies/${id}`);
    }

    addDriverVacancy(newVacancy: DriverVacancy): Observable<DriverVacancy | TrackerError> {
        return this.http.post<DriverVacancy>('/api/DriverVacancies', newVacancy);
    }

    deleteDriverVacancy(id: number): Observable<DriverVacancy | TrackerError> {
        return this.http.delete<DriverVacancy>(`/api/DriverVacancies/${id}`);
    }
    
    addBabysitterVacancy(newVacancy: BabysitterVacancy): Observable<BabysitterVacancy> {
        return this.http.post<BabysitterVacancy>('/api/BabysitterVacancies', newVacancy);
    }

    deleteBabysitterVacancy(id: number): Observable<BabysitterVacancy> {
        return this.http.delete<BabysitterVacancy>(`/api/BabysitterVacancies/${id}`);
    }

    addBabysitterResume(newVacancy: BabysitterResume): Observable<BabysitterResume> {
        return this.http.post<BabysitterResume>('/api/BabysitterResumes', newVacancy);
    }

    getBabysitterResumes(): Observable<BabysitterResume[]> {
        return this.http.get<BabysitterResume[]>('/api/BabysitterResumes/');
    }

    getBabysitterResume(id: number): Observable<BabysitterResume | TrackerError> {
        return this.http.get<BabysitterResume>(`/api/BabysitterResumes/${id}`);
    }

    deleteBabysitterResume(id: number): Observable<BabysitterResume> {
        return this.http.delete<BabysitterResume>(`/api/BabysitterResumes/${id}`);
    }

    getBabysitterResumesMatched(id: number): Observable<BabysitterResume[]> {
        return this.http.get<BabysitterResume[]>(`/api/BabysitterResumesMatched/${id}`);
    }

    addDriverResume(newVacancy: DriverResume): Observable<DriverResume> {
        return this.http.post<DriverResume>('/api/DriverResumes', newVacancy);
    }

    getDriverResumes(): Observable<DriverResume[]> {
        return this.http.get<DriverResume[]>('/api/DriverResumes/');
    }

    getDriverResume(id: number): Observable<DriverResume | TrackerError> {
        return this.http.get<DriverResume>(`/api/DriverResumes/${id}`);
    }

    deleteDriverResume(id: number): Observable<DriverResume> {
        return this.http.delete<DriverResume>(`/api/DriverResumes/${id}`);
    }

    getEnum(): Observable<any> {
        return this.http.get<any>(`/api/enums/`);
    }
}
