import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { ResponsiveState } from 'ngx-responsive';


@Injectable()
export class MobileGuard implements CanActivate {
   constructor(private device: ResponsiveState,
               private router: Router) {}

   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
       if (this.device.isMobile()) {
           return this.device.isMobile();
       } else {
           this.router.navigate(['/']);
           return this.device.isMobile();
       }
   }

}
