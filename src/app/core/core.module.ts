import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarBsComponent } from './components/navbar-bs/navbar-bs.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    NavbarBsComponent,
    HomeComponent,           
  ],
  imports: [
    CommonModule,    
    SharedModule,     
    MatIconModule,   
    RouterModule.forChild([])
  ],
  exports: [
    NavbarBsComponent
  ]
})
export class CoreModule { }
