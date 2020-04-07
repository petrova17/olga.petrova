import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError, pipe } from 'rxjs';
import { catchError, retry, first } from 'rxjs/operators';
import { TrackerError } from '../models/trackerError';

@Injectable({
    providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let clone: HttpRequest<any> = req.clone({
            setHeaders: { 'Content-Type': 'application/json'}
        });

        return <any>next.handle(clone)
            .pipe(                
               catchError(err => this.handleHttpError(err))
            );
    }

    private handleHttpError(error: HttpErrorResponse): Observable<TrackerError> {
        console.log(error);
        console.log('iterceptor!');

        let dataError = new TrackerError();
        dataError.errorNumber = error.status;
        dataError.message = error.message;
        dataError.friendlyMessage = 'An error occured retrieving data.';
        return throwError(dataError)
    }
    
}
