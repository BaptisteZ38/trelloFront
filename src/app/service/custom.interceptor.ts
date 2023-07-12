import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class CustomInterceptor implements HttpInterceptor{
    
    constructor (private cookieService: CookieService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const localToken = this.cookieService.get('token');
      if (localToken) {
        req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${localToken}`) });
      }
      return next.handle(req);
    }
      

}