import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy, OnInit {
  
  products: Product[];
  filteredProducts: any[];
  subscription: Subscription; 
 
  constructor(private productsService: ProductService, private router: Router) {
    
    this.subscription = this.productsService.getAll().snapshotChanges()
      .pipe(map((res => res.map(r =>
        ({ 
          id: r.payload.doc.id, 
          imageUrl: r.payload.doc.get('imageUrl'),
          title: r.payload.doc.get('title'),
          price: r.payload.doc.get('price'),
          category: r.payload.doc.get('category')          
        })
      )))).subscribe(res => this.products = this.filteredProducts =  res)
    
  }
  ngOnInit(): void {
    
  }
  
  filter(query: string) {    
    this.filteredProducts = (query) ? 
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : 
      this.products;    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  
  
}
