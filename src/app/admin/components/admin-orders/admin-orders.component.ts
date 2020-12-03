import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { OrderService } from 'app/shared/services/order.service';
import { Order } from 'app/shared/models/order';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  subscription: Subscription;
  customer: string;
  date: string;
  rows: Order[] = [];
  ColumnMode = ColumnMode;  

  constructor(private orderService: OrderService) { 
    this.subscription = this.orderService.getAll()
      .subscribe(response => this.rows = response)
        // console.log(response);
        // this.rows = response.map(x => {
        //   return {
        //     name: x.shipping.name,
        //     datePlaced: x.datePlaced
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
