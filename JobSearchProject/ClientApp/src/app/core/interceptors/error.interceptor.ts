import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TrackerError } from '../../models/trackerError';

@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

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
        console.log('ErrorInterceptor!');

        let dataError = new TrackerError();
        dataError.errorNumber = error.status;
        dataError.message = error.message;
        dataError.friendlyMessage = 'An error occured retrieving data.';
        return throwError(dataError)
    }
    
}
