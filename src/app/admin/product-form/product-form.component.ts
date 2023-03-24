import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { map, Observable, switchMap, take } from 'rxjs';
import { CategoryService } from 'src/app/category.service';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  product : Product = {  
    id: '',
    title: '',
    category: '',
    imageUrl: '',
    price: 0
  };
  p;
  categories$ : Observable<any>;
  id;
  constructor(
    private categoryService: CategoryService, 
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
    ) 
  {
    //TODO: Charline melhorar
    this.categories$ = categoryService.getCategories()
    .pipe(
      map(res => res.map(cat => ({ id: cat.payload.doc.id, title: cat.payload.doc.get('name') })))
      ); 

    this.id = this.route.snapshot.paramMap.get('id');  
      
    
    if(this.id) this.productService.getProduct(this.id).get()
      .pipe(take(1))
      .subscribe(result  => this.product = result.data() as Product)
       
  }

  save(product) {
    if(this.id) this.productService.update(this.id, this.product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if(!confirm('Tem certeza que quer deletar esse produto?')) return;

    this.productService.delete(this.id);    
    this.router.navigate(['/admin/products']);
    
  }
}
