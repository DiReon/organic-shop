import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'app/shared/models/product';
import { ShoppingCartService } from 'app/shared/services/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input("product") product: Product;
  @Input("shopping-cart") shoppingCart;
  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.updateItem(this.product, 1);
  }

  removeFromCart() {
    this.cartService.updateItem(this.product, -1);
  }

}
