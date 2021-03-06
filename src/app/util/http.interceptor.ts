import { HttpInterceptor, HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError } from 'rxjs/operators';
import { of, throwError } from "rxjs";
import { Observable } from "rxjs";
import { StorageService } from "./storage/storageService";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    private handleError(err: HttpErrorResponse): Observable<any> {
        console.log(JSON.stringify(err))
        //handle your auth error or rethrow
        if (err.status === 401 || err.status === 403) {
            console.log("ERREUR DE CONNEXION, REDIRECTION VERS LA PAGE DE LOGIN")
            //navigate /delete cookies or whatever
            this.router.navigateByUrl(`/admin/login`);
            // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
            return of(err.message); // or EMPTY may be appropriate here
        }
        return throwError(err);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req
        
        if (StorageService.isLoggedIn()) {
            authReq = req.clone({
                headers: authReq.headers.append('x-api-key', StorageService.getToken())
            });
        }
        return next.handle(authReq).pipe(catchError(err => this.handleError(err)));
    }
}