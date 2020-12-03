import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AngularFireList } from '@angular/fire/database';
import { ProductService } from 'app/shared/services/product.service';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  
  rows = [];
  rowsRef: AngularFireList<any>;
  temp = [];
  ColumnMode = ColumnMode;  

  constructor(private productService: ProductService) { 
   
    this.subscription = this.productService.getAll()
      .subscribe(response => {
      this.rows = this.temp = response
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  filter(query) {
    this.rows = (query) ?
      this.temp.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.temp;
  }
}
