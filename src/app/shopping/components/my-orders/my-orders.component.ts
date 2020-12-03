import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../../../shared/services/order.service';
import { Subscription } from 'rxjs';
import { Order } from '../../../shared/models/order';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AuthService } from '../../../shared/services/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  orderSubscription: Subscription;
  userSubscription: Subscription;
  userId: string;
  rows: Order[] = [];
  ColumnMode = ColumnMode;  

  constructor(private orderService: OrderService, private authService: AuthService) {}

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe( user => {
      this.userId = user.uid;
      this.orderSubscription = this.orderService.getUserOrders(this.userId)
      .subscribe(response => {
        this.rows = response
      })
    });

    
  }

  ngOnDestroy() {
    this.orderSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
