import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFirestore) { }

  create(product) {
    this.db.collection('products').add(product);
  }

  getAll() {
    return this.db.collection('products');
  }

  getProduct(uid:string)  {    
    // return this.db.doc(uid).get();    
    return this.db.collection('products').doc(uid);
  }

  update(productId, product) {
    return this.db.collection('products').doc(productId).update(product);
  }

  delete(productId) {
    return this.db.collection('products').doc(productId).delete();
  }
}
