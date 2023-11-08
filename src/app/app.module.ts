import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { SellerComponent } from './seller/seller.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ProductListCardComponent } from './product-list-card/product-list-card.component';
import { CartProdcutListComponent } from './cart-prodcut-list/cart-prodcut-list.component';
import { SearchPipe } from './pipes/search.pipe';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SellerComponent,
    LoginComponent,
    CartComponent,
    ProductCardComponent,
    ProfileComponent,
    ProductListComponent,
    ProfileCardComponent,
    ProductListCardComponent,
    SearchPipe,
    CartProdcutListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
