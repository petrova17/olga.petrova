import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { TrackerError } from '../models/trackerError';

@Injectable({
    providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>,
        next: HttpHandler):
        Observable<HttpEvent<any>> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        const clone = req.clone({
            headers: headers
        });

        return <any>next.handle(clone)
            .pipe(
                retry(2),
                catchError(err => this.handleHttpError(err))
            );
    }

    private handleHttpError(error: HttpErrorResponse): Observable<TrackerError> {
        let dataError = new TrackerError();
        dataError.errorNumber = error.status;
        dataError.message = error.message;
        dataError.friendlyMessage = 'An error occured retrieving data.';
        return throwError(dataError)
    }
    
}
