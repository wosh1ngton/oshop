import { Component, OnInit } from '@angular/core';
import { filter, map, pipe, switchMap } from 'rxjs';
import { OrderService } from '../order.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders$;

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) {

  } 

  async ngOnInit() {
    
    let user = JSON.parse(localStorage.getItem('user'));

    this.orders$ = this.orderService.getOrders().pipe(
      map((res:any[]) =>  {
        const result = res.filter(x => x.userId == user.uid);
        console.log(result);
        return result;
    }))

  }

}
