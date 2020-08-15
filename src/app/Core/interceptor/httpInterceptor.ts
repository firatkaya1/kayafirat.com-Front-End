import { AuthenticateService } from './../Service/AuthenticateService/authenticate.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    
    constructor(private authenticationService: AuthenticateService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {       
        const skipIntercept = req.headers.has('skip');
        const photoIntercept = req.headers.has('photo');
         if(skipIntercept){
             console.log("skipe sahiptir");
            req = req.clone({
                headers: req.headers.delete('skip')
            });
            return next.handle(req);
        }
        else if(photoIntercept) {
            let authReq = req.clone({
                headers: new HttpHeaders({
                    'Authorization': `Bearer ${this.authenticationService.getLoggedInUserName()}`
                })
                
            });
            req.headers.delete('photo')
            return next.handle(authReq);
        }
        else if (this.authenticationService.isUserLoggedIn() && req.url.indexOf('basicauth') === -1 ) {
        
            let authReq = req.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.authenticationService.getLoggedInUserName()}`
                })
            });
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }
    }
}