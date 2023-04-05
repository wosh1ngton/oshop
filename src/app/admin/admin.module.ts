import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
import { authGuard, authGuardAdmin } from '../shared/services/auth.service';
import { AddUserComponent } from './components/add-user/add-user.component';

@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,    
    RouterModule.forChild( [
    { path: 'add-user', component: AddUserComponent },
    { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [authGuard, authGuardAdmin] },
    { path: 'admin/products/new', component: ProductFormComponent, canActivate: [authGuard, authGuardAdmin] },
    { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [authGuard, authGuardAdmin] },
    { path: 'admin/products', component: AdminProductsComponent, canActivate: [authGuard, authGuardAdmin] }]),    
  ]  
})
export class AdminModule { }
