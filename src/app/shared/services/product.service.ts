import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  listRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    this.db.list('/products').push(product);
  }

  update(productId, product) {
    return this.db.object('/products/'+productId).update(product);
  }

  getAll() {
    this.listRef = this.db.list('/products')
    return this.listRef.snapshotChanges()
      .pipe(
        map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))));
  }

  get(productId) {
    return this.db.object('/products/' + productId);
  }

  delete(productId) {
    return this.db.object('/products/'+productId).remove();
  }
}
