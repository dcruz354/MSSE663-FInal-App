import { AuthService } from './../_services/auth.service';
import { Injectable } from "@angular/core";
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        const accessToken = this.authService.getAccessToken();
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return next.handle(request);
    }
}