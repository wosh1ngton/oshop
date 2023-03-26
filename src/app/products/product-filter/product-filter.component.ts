import { Component, Input } from '@angular/core';
import { map } from 'rxjs';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {

  categories$;
  @Input('category') category;
  
  
  constructor(private categoryService: CategoryService) {
    this.categories$ = categoryService.getCategories().pipe(
      map(res => res.map(cat => ({ id: cat.payload.doc.id, title: cat.payload.doc.get('name') })))
    );
  }


}
