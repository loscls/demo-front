import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerComponent } from './seller/seller.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { authGuard } from './auth.guard';
import { productResolver } from './resolver/product.resolver';


const routes: Routes = [
  {path: "", component: HomeComponent, resolve:{data: productResolver}},
  {path: "seller", component: SellerComponent},
  {path: "seller-home", component: SellerHomeComponent, canActivate:[authGuard]},
  {path: "login", component: LoginComponent},
  {path: "cart", component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
