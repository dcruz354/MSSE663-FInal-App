import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { OrdersModel } from '../../../../../DIMACalculatorAppBackend/restful-api-mongo/src/models/to-order-list.model'
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../_services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  //orderLists$: Observable<OrdersModel[]> = new Observable;
  orderList$: Observable<OrdersModel[]> = new Observable;
  order: Observable<OrdersModel> = new Observable;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.orderList$ = this.orderService.getOrders();
  }

}
