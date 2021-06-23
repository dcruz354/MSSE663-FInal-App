import { OrderListComponent } from './order-list/order-list.component';
import { OrderHomeComponent } from './order-home/order-home.component';
import { AuthGuard } from './_helpers/auth.guard';
import { AccountComponent } from './account/account.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',           redirectTo: 'login', pathMatch: 'full'},
  { path: 'login',      component: LoginComponent},
  { path: 'register',   component: RegisterComponent},
  { path: 'home',       component: HomeComponent},
  { path: 'order-home', component: OrderHomeComponent},
  { path: 'order-list', component: OrderListComponent},
  { path: 'account',    component: AccountComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
