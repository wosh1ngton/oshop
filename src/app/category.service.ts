import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { orderBy } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFirestore) { }

  getCategories() {
    // return this.db.collection('categories', res => res.orderBy('name')).valueChanges();
    
    let category  = this.db.collection('categories').snapshotChanges();
    
    //let category2 = this.db.collection('categories').snapshotChanges();
    return category;
    
  }


}
