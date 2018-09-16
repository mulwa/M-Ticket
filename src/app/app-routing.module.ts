import { FindBusComponent } from './components/find-bus/find-bus.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from  '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { BusDetailsComponent } from './components/bus-details/bus-details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: RegistrationComponent},
  { path: 'home', component: HomeComponent},
  { path: 'findbus', component: FindBusComponent},
  { path: 'busDetails', component:BusDetailsComponent}




];

@NgModule({
  exports:[
    RouterModule
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
