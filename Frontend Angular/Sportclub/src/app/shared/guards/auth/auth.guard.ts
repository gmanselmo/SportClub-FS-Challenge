import { CanActivateFn, CanMatchFn, Route } from "@angular/router";
import { Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';

export namespace AuthGuard {
  let router: Router;

  export function setRouter(ruta: Router) {
    router = ruta;
  }

  export const AuthGuardActivate: CanActivateFn = (route, state) => {
    if (localStorage.getItem('isLogged') === 'true') {
      return true;
    } else {
      router.navigate(['login']);
      return false;
    }
  };

  export const AuthGuardMatch: CanMatchFn = (route, segments) => {
    return localStorage.getItem('isLogged') === 'true' ? true : false;
  };
  
}
