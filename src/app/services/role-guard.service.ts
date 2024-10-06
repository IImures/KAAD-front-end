import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles = route.data['roles'] as string[];
    // const hasRole = expectedRoles.some(role => this.jwtParser.hasRole(role));
    //
    // if (!hasRole) {
    //   this.router.navigate(['/login']);
    //   return false;
    // }
    return true;
  }
}
