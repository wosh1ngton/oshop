import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxDatatableModule ,
    NgbModule, 
    BrowserAnimationsModule   
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    FormsModule,
    NgxDatatableModule,
    NgbModule, 
    BrowserAnimationsModule    
  ]
})
export class SharedModule { }
