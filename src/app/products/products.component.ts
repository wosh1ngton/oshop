import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { Product } from '../models/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  /**
   *
   */
  products$: Product[];
  filteredProducts: Product[] = [];
  
  category;
  constructor(private productService: ProductService,    
    route: ActivatedRoute
  ) {

    this.productService.getAll().snapshotChanges()
      .pipe(
        map(res => res.map(v => {
          const data = v.payload.doc.data() as Product;
          const id = v.payload.doc.id;
          return { id, ...data };
        })
        ),
        tap(produto => this.products$ = produto),
        switchMap(() => route.queryParamMap)
      ).subscribe(params =>{ 
        this.category = params.get('category');
        this.filteredProducts = (this.category) ?
        this.products$.filter(p => p.category === this.category) :
        this.products$;
      });

   
  }


}
