import { Component, Input } from '@angular/core';
import { Product } from 'app/shared/models/product';
import { ShoppingCartService } from 'app/shared/services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input("product") product: Product;
  @Input("show-actions") showActions = true;
  @Input("shopping-cart") shoppingCart;
  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.updateItem(this.product, 1);
  }
}
