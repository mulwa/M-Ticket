import { Router } from '@angular/router';
import { MainService } from './main.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardGuard implements CanActivate {
  constructor(private mainService:MainService, private router:Router){

  }
  canActivate():boolean{
    if(!this.mainService.isAuthenticated()){
        this.router.navigate(['login']);
        console.log('Authentication  failed');
        return false;
        
    }
    console.log('Token good');
    return true;
   
}
}
