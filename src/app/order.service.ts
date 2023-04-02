import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Order } from './models/order';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFirestore, private shoppingCartService:ShoppingCartService) { }

  async placeOrder(order: Order) {    
    const newOrder = JSON.parse(JSON.stringify(order));
    let result = await this.db.collection('orders').add(newOrder);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.collection('orders').valueChanges();
  }

  getOrdersByUser(userId: string) {
    return this.db.collection('orders').ref.where('userId', '==', userId).get();
  }

}
