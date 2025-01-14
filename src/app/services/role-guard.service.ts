import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {catchError, map, Observable, of} from "rxjs";
import {AuthService} from "./auth.service";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {

  constructor(
    private authService: AuthService,
    private router: Router,
    private localStorage: LocalStorageService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token = this.localStorage.getToken();
    if(!token) {
      this.router.navigate(['login']);
      return false;
    }

    return this.authService.verify(token).pipe(
      map(() => true),
      catchError(() => {
        console.log('Routing to login')
        this.router.navigate(['login']);
        return of(false)
      })
    );
  }

}
