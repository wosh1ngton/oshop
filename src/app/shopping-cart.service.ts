import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, take } from 'rxjs';
import { Product } from './models/product';
import { ShoppingCart } from './models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFirestore) { }
 

  async addToCart(product: Product) {
    this.updateItem(product,1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }


  async getCart() : Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.collection('shopping-carts/').doc(cartId).collection('items').valueChanges()               
                .pipe(map((x : any) => new ShoppingCart(x)));              
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    const snapShot = await this.db.collection('shopping-carts').doc(cartId).collection('items').ref.get();
    snapShot.forEach(doc => {
      doc.ref.delete();
    })
  }

  private create() {
    return this.db.collection('shopping-carts').add({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.collection('shopping-carts').doc(cartId).collection('items').doc(productId);
  }

  private async getOrCreateCartId() : Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.id)
    return result.id;
  }

  
  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    
    let item$ = this.getItem(cartId, product.id);
    console.log(item$);
    item$.valueChanges().pipe(take(1)).subscribe((item: any) => {
      let quantity = (item?.quantity || 0) + change;
      if(quantity === 0) item$.delete();
      else item$.set({ 
        id: product.id,
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: quantity
      }, {merge: true});
    });
  }


}
