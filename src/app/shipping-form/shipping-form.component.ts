import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../order.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  @Input('cart') cart: ShoppingCart;
  /**
   *
   */
  constructor(
    private router: Router,    
    private orderService: OrderService,
    private authService: AuthService
    ) {  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
    
  ngOnInit(): void {
    this.userSubscription = this.authService.dataUser.subscribe(user => this.userId = user.uid);
  }

  shipping: any = {};
  userSubscription: Subscription;
  userId: string;

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);   
    let result = await this.orderService.placeOrder(order);    
    this.router.navigate(['/order-success', result.id])
  }
}
