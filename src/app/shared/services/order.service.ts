import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ShoppingCartService } from './shopping-cart.service';
import { map } from 'rxjs/operators';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  listRef: AngularFireList<Order>;
  constructor(private db: AngularFireDatabase,
              private cartService: ShoppingCartService) {}

  async create(order) {
    // console.log("Called create order method of orderService");
    // console.log(order);
    let result = await this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }
  update(id, order) {
    return this.db.object('/orders/'+ id).update(order);
  }
  get(orderId) {
    return this.db.object<any>('/orders/' + orderId);
  }
  getAll() {
    this.listRef = this.db.list('/orders');
    return this.listRef.snapshotChanges()
    .pipe(
      map(changes => 
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))));;
  }
  getUserOrders(userId) {
    return this.db.list<any>('/orders', ref => ref.orderByChild('userId').equalTo(userId)).snapshotChanges()
    .pipe(
      map(changes => 
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))));;
  }

}
