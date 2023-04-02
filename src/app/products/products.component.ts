import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subscription, switchMap, tap } from 'rxjs';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { ProductService } from '../product.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  /**
   *
   */
  products$: Product[];
  filteredProducts: Product[] = [];
  cart$: Observable<ShoppingCart>;
  category;

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
  ) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();    
  }

  private populateProducts() {
    this.productService.getAll().snapshotChanges()
    .pipe(
      map(res => res.map(v => {
        const data = v.payload.doc.data() as Product;
        const id = v.payload.doc.id;
        return { id, ...data };
      })
      ),
      tap(produto => this.products$ = produto),
      switchMap(() => this.route.queryParamMap)
    ).subscribe(params => {

      this.category = params.get('category');
      this.applyFilter();       
    });
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
    this.products$.filter(p => p.category === this.category) :
    this.products$;
  }


}
