import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from '../models/product';
import { take, map } from 'rxjs/operators'
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';
import { ShoppingCartItem } from '../models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
cartId: string;
  constructor(private db: AngularFireDatabase) {  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    
    return this.db.object<any>('/shopping-carts/' + cartId).valueChanges().pipe(
      map(x => new ShoppingCart(x.items)) //from Observable we create instance of ShoppingCart class, passing items as argument
    );
  }
  
  async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ : AngularFireObject<ShoppingCartItem> = this.getItem(cartId, product.key);
    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: ShoppingCartItem) => {
        let quantity = (item ? item.quantity : 0) + change;
        if (quantity === 0) item$.remove();
        else item$.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: quantity
        });
      });
  };
  
  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.list('/shopping-carts/'+cartId+'/items').remove();
  }

  private create() {
    let time = new Date().getTime();
    return this.db.list('/shopping-carts/').push({ dateCreated: time});
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object<ShoppingCartItem>('/shopping-carts/'+cartId+'/items/'+productId);
  }

  private async getOrCreateCartId() {
    let cartId =localStorage.getItem('cartId');
    if (cartId) return cartId;
    
    let result = await this.create();
    
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

}
