import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '@app/features/auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class RoleAccessGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let roles = route.data["formFlag"] as Array<string>;
      if (this.authService.isAccessIn(roles[0])) { 
       
          return true;
      }
      this.router.navigate(['/dashboard']);
      return false;
  }
  }

