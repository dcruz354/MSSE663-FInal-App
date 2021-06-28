import { catchError, map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from './../../../../../DIMACalculatorAppBackend/restful-api-mongo/src/models/user.model';
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";

@Injectable({ providedIn: 'root'})

export class AuthService {
    API_URL: string = environment.apiUrl;
    headers = new HttpHeaders().set('Content-Type', 'application/json');

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser$: Observable<User>;

    constructor(
        public router: Router,
        private http: HttpClient
    ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || '{}' ));
        this.currentUser$ = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    register(firstName: string, lastName: string, username: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.API_URL}/users/register`, {firstName, lastName, username, password})
        .pipe(map(res => {
            const user = res.user;
            if(res.user && res.token) {
                localStorage.setItem('access_token', res.token);
                localStorage.setItem('currentUser', JSON.stringify(res.user));
                this.getUserProfile(res.user._id).subscribe((result) => {
                    this.currentUser$ = res.user;
                });
            }
            return user;
        }),
            catchError(this.handleError)
        );
    }

    login(username: string, password: string){
        return this.http.post<any>(`${this.API_URL}/users/login`, { username, password})
        .pipe(map(res => {
            const user = res.user;
            if (res.user && res.token) {
                localStorage.setItem('access_token', res.token);
                localStorage.setItem('currentUser', JSON.stringify(res.user));
                this.getUserProfile(res.user._id).subscribe((res) => {
                    this.currentUser$ = res.user;
                });
            }
            return user;
        }),
            catchError(this.handleError)
        );
    }

    logout() {
        return this.http.post<any>(`${this.API_URL}/users/logout`, {})
        .pipe(catchError(this.handleError))
        .subscribe((res: any) => {
            if(localStorage.removeItem('access_token') == null && localStorage.removeItem('currentUser') == null) {
                window.alert('Successfully Logged out');
                this.router.navigate(['/login']);
            }
        });
    }

    logoutAll() {
        return this.http.post<any>(`${this.API_URL}/users/logoutAll`, {})
        .pipe(catchError(this.handleError))
        .subscribe((res: any) => {
            if(localStorage.removeItem('access_token') == null && localStorage.removeItem('currentUser') == null) {
                window.alert('Successfully logged out of all devices');
                this.router.navigate(['/login']);
            }
        });
    }

    getUserProfile(id: any): Observable<any> {
        return this.http.get(`${this.API_URL}/users/me`)
        .pipe(map((res: any) => {                               // res: Response
            return res || {};
        }),
            catchError(this.handleError)
        );
    }

    isLoggedIn() {
        const authToken = localStorage.getItem('access_token');
        return (authToken !== null);
    }

    getAccessToken()  {
        return localStorage.getItem('access_token');
    }

    update(firstName: string, lastName: string, password: string) {
        return this.http.put<any>(`${this.API_URL}/users/me/update`, {firstName, lastName, password})
        .pipe(map((res: any) => {
            this.getUserProfile(res._id).subscribe((result) => {
                this.currentUser$ = result;
                localStorage.setItem('currentUser', JSON.stringify(result));
                return result;
            });
        }),
            catchError(this.handleError));
    }


    handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if(!errorRes.error) {
            return throwError(errorMessage);
            }

        const errorCode = errorRes.error;
        switch (errorCode) {
            case 'AUTH_USERNAME': 
                errorMessage = 'This username exists already';
                break;
            case 'AUTH_PASS_LENGTH':
                errorMessage = 'The password must be at least 6 characters long';
                break;
            case 'AUTH_FAIL':
                errorMessage = 'The password provided was incorrect';
                break;
            case 'UPDATE_FAIL':
                errorMessage = 'Failed to update user. Please try again';
                break;
            default: {
                errorMessage = 'An error occurred! Please try again or contact support.';
                break;
            } 
        }
        
        return throwError(errorMessage);
    }

}