import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { OrdersModel } from '../../../../restful-api-mongo/src/models/order.model'
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../_services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  //orderLists$: Observable<OrdersModel[]> = new Observable;
  orderList$: Observable<OrdersModel[]>;
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
