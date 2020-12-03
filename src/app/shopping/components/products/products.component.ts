import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../../../shared/models/shopping-cart';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products =[];
  temp = [];
  category: string;
  cart$: Observable<ShoppingCart>;
  constructor(
    private productService: ProductService, 
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService) {}

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    console.log("Shopping Cart created");
    this.populateCart();
  }

  private populateCart() {
    
    this.productService.getAll().pipe(
      switchMap(products => {
        this.temp = this.products = products;
        return this.route.queryParamMap;
      }))
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
        console.log("Shopping car populated");
        
      }
    )
  }

  private applyFilter() {
    this.products = (this.category) ?
      this.temp.filter(p => p.category === this.category):
      this.temp;
  }
}
