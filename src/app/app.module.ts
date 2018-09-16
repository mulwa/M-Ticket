import { MainService } from './main.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { FindBusComponent } from './components/find-bus/find-bus.component';
import { MatAutocompleteModule} from  '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import { BusDetailsComponent } from './components/bus-details/bus-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuardGuard } from './auth-guard.guard';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    RegistrationComponent,
    SideMenuComponent,
    HomeComponent,
    FindBusComponent,
    BusDetailsComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,  
    HttpClientModule, 
    Ng4LoadingSpinnerModule.forRoot(),
    FlashMessagesModule.forRoot(),
    AppRoutingModule
  ],
  providers: [MainService,AuthGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
