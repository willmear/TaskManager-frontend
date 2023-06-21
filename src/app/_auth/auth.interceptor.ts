import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { UserService } from "../entities/user/service/user.service";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(public userService: UserService, protected router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if(req.headers.get('No-Auth') === 'True') {
            //console.log("idk");
            return next.handle(req.clone());
        }

        const token = this.userService.getToken();
        if (token) {
            req = this.addToken(req, token);
        }
        return next.handle(req);

        // return next.handle(req).pipe(
        //     catchError(
        //         (err: HttpErrorResponse) => {
        //             console.log(err.status);
        //             if(err.status == 401) {
        //                 this.router.navigate(['/login'])
        //             } else if(err.status == 403) {
        //                 // this.router.navigate(['/home']);
        //                 console.log("403 error");
        //             }
        //             return throwError(() => ('Something is wrong.'));
        //         }
        //     )
        // );
    }

    private addToken(request: HttpRequest<any>, token:string) {
        return request.clone(
            {
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        )
    }
    
}