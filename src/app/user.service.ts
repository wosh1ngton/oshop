import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { QuerySnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AppUser } from './shared/services/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  private dbPath = '/users';
  usersRef: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore) {
     this.usersRef = db.collection(this.dbPath);
  }
  public create(user: any): Promise<any> {

    return this.usersRef.add({ ...user });

  }
  getAllUsers() {
    return new Promise<any>((resolve) => {
      this.db.collection('users').valueChanges({ id: 'id' }).subscribe(users => resolve(users));
    })
  }

  get(uid:string)  {    
    return this.usersRef.doc(uid).get();    
  }



}
