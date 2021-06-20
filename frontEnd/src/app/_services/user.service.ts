import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators'
import { User } from '../../../../restful-api-mongo/src/models/user.model';

const htttpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})}

@Injectable({
    providedIn: 'root'
})

export class UserService {
    API_URL: string = environment.apiUrl;
    headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private httpClient: HttpClient, public router: Router) {

    }

    getUsers(): Observable<any> {
        return this.httpClient.get(`${this.API_URL}/users/getAllUsers`).pipe(
            map((res: any) => { 
                return res || {};
    }),
        catchError(this.handleError)
        );
    }

    handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if(!errorRes.error) {
            return throwError(errorMessage);
        }
        const errorCode = errorRes.error;
        switch (errorCode) {
            case 'SERVER_ERROR':
                errorMessage = 'Something happened server-side';
                break;
            default: {
                errorMessage = 'An error occurred! Please try again';
                break;
            }
        }
        return throwError(errorMessage);
    }
}