import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap, tap } from 'rxjs';
import { Product } from '../../../shared/models/product'
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { ProductService } from '../../../shared/services/product.service';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';

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
