import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { TrackerError } from '../../models/trackerError';
import { HttpCacheService } from '../services/http-cache.service';

@Injectable({
    providedIn: 'root'
})
export class CacheInterceptor implements HttpInterceptor {

    constructor(private cacheService: HttpCacheService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if (req.method !== 'GET') {
            console.log(`Invalidating cache: ${req.method} ${req.url}`);
            this.cacheService.invalidateCache();
            return next.handle(req);
        }

        //retrieve a cached response
        const cacheResponse: HttpResponse<any> = this.cacheService.get(req.url);

        // return cached response
        if (cacheResponse) {
            console.log(`Returning a cached response: ${cacheResponse.url}`);
            console.log(cacheResponse);
            return of(cacheResponse);
        }

        //send request to server and add response to cache
        return next.handle(req)
            .pipe(
                tap(event => {
                    if (event instanceof HttpResponse) {
                        console.log(`Adding item to cache: ${req.url}`);
                        this.cacheService.put(req.url, event);
                    }
                })
            )

    }
}
