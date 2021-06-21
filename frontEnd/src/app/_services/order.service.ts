import { catchError, map} from 'rxjs/operators';
import { OrdersModel } from '../models/order/order.model'; 
import { Router } from '@angular/router';
import { Observable, Subject, throwError, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';



const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
}

@Injectable({
    providedIn: 'root'
})

export class OrderService {
    API_URL: string = environment.apiUrl;
    headers = new HttpHeaders().set('Content-Type', 'application/json');
        
    private orderToUpdate$?: Observable<OrdersModel>;


    selectedOrder: Subject<OrdersModel> = new BehaviorSubject<OrdersModel>(new OrdersModel('', 0, 0, 0));

    constructor(private httpClient: HttpClient, public router: Router) {
    }

    setSelectedOrder(order: OrdersModel) {
        this.selectedOrder.next(order);
    }

    getOrders(): Observable<any> {
        return this.httpClient.get(`${this.API_URL}/orders/`)
        .pipe(map((res: any) => {
            return res || {};
        }),
        
        catchError(this.handleError)
        );
    }

    saveOrder(name: string, numberOfHoles: number, savings: number, size: number): Observable<OrdersModel> {
        return this.httpClient.post<any>(`${this.API_URL}/orders/`, {name, numberOfHoles, savings, size}, httpOptions);
    }

    getOrder(id: string): Observable<any>{
        return this.httpClient.get(`${this.API_URL}/orders/${id}`)
        .pipe(map((res: any) => {
            return res || {};
        }),
         catchError(this.handleError)
        );
    }

    // user should not have the option to update order because he can compare the results
    // updateOrder(id: string) {
    //     return this.httpClient.put<any>(`${this.API_URL}/orders/${id}`, {})
    // }

    handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error) {
          return throwError(errorMessage);
        }
        const errorCode = errorRes.error;
        switch (errorCode) {
          case 'SERVER_ERROR':
            errorMessage = 'Something happened server-side and the order wasn\'t added.';
            break;
          case 'UPDATE_FAIL':
            errorMessage = 'Failed to update order. Please try again.';
            break;
          default: {
            errorMessage = 'An error occurred! Please try again or contact support.';
            break;
          }
        }
        return throwError(errorMessage);
      }

    
}