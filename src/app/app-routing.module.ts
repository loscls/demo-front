import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerComponent } from './seller/seller.component';

import { CartComponent } from './cart/cart.component';
import { authGuard } from './auth.guard';
import { productResolver } from './resolver/product.resolver';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {path: "", component: HomeComponent, resolve:{data: productResolver}},
  {path: "seller", component: SellerComponent},
  {path: "profile", component: ProfileComponent, canActivate:[authGuard]},
  {path: "login", component: LoginComponent},
  {path: "cart", component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
