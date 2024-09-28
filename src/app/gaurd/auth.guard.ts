import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router=inject(Router);
  const service=inject(AuthService);
  if(service.IsloggedIn()){
    return true;
  }
  else{
    router.navigate(['login']);
    return false;

  }
};

