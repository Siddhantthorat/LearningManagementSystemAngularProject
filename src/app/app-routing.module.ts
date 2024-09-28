import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourselistComponent } from './courselist/courselist.component';
import { authGuard } from './gaurd/auth.guard';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
 {component:LoginComponent,path:'login'},
 {component:RegisterComponent,path:'register'},
 {component:HomeComponent,path:'',canActivate:[authGuard]},
 {component:ListComponent,path:'user',canActivate:[authGuard]},
 {component:CourselistComponent,path:'courselist'},
// {component:HomeComponent,path:'',canActivate:[AuthGuard]},
//  {component:ListComponent,path:'user',canActivate:[AuthGuard]},
//  {component:CustomerComponent,path:'customer',canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
