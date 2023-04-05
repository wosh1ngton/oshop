import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, switchMap } from 'rxjs';
import { DataUser } from '../../../shared/models/data-user';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { AuthService } from '../../../shared/services/auth.service';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'navbar-bs',
  templateUrl: './navbar-bs.component.html',
  styleUrls: ['./navbar-bs.component.css']
})
export class NavbarBsComponent implements OnInit {
  /**
   *
   */
  usuario: DataUser = new DataUser();
  cart$: Observable<ShoppingCart>;


  constructor(
    public authService: AuthService, 
    private userService: UserService,
    public afAuth: AngularFireAuth,
    private shoppingCartService: ShoppingCartService
    ) {
      if (!this.authService.isLoggedIn)
      return;

    this.afAuth.authState
      .pipe(
        switchMap((res) => this.userService.get(res.uid))
      ).subscribe(payload => this.usuario = payload.data());
  }

  async ngOnInit() {    
    this.cart$ = (await this.shoppingCartService.getCart());   
  }

}
