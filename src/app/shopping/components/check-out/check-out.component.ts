import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { OrderService } from '../../../shared/services/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Order } from '../../../shared/models/order';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  cart$;
  cart;
  userId: string;
  shipping: any = {};
  cartSubscription: Subscription;
  userSubscription: Subscription
  constructor(
    private cartService: ShoppingCartService,
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) { 
    }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.cartSubscription = this.cart$.subscribe( cart$ => this.cart = cart$)
    this.userSubscription = this.authService.user$.subscribe( user => this.userId = user.uid)
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.create(order);
    // console.log(result.key);
    this.router.navigate(['/order-success', result.key])
  }


}
