import { Component } from '@angular/core';
import { MainService } from './main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private mainservice:MainService,private router:Router){

  }
  title = 'Bookings';

  onLogout(){
    this.mainservice.logOut();
    console.log('logout clicked');
    this.router.navigate(['login']);    
  }
}

