import { Bus } from './../../models/bus';
import { City } from './../../models/city';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup} from  '@angular/forms';
import { MainService } from '../../main.service';
import { Dates } from '../../models/date';
import { username, api_key, hash } from '../../models/constants';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {Router, NavigationExtras} from "@angular/router";



@Component({
  selector: 'app-find-bus',
  templateUrl: './find-bus.component.html',
  styleUrls: ['./find-bus.component.css']
})
export class FindBusComponent implements OnInit {
  locations:any;
  city:City[];
  travelingDates:Dates[];
  to_name:string;
  from_name:string;
  availableVehicles:Bus[];

  travelForm:FormGroup;
  from_city:string;
  to_city:string;

  loadingLocations:boolean;
  searchingVehcles:boolean;

  no_vehicles_message:string;

  constructor(private frmBuilder:FormBuilder,
      private main_service:MainService, 
      private spinnerService: Ng4LoadingSpinnerService,
      private router:Router ) {
    this.initializeForm();
    this.fetchLocation();
    this.fetchTravelingDates();

    this.loadingLocations = true;
    this.searchingVehcles=false;
    
  }
  initializeForm(){
    this.travelForm = this.frmBuilder.group({
      from_city:[''],
      to_city:'',
      travel_date:'',
      username:username,
      api_key:api_key,
      hash:hash,
      action:"AvailableBuses"

    })
    
  }
  fetchLocation(){
    this.main_service.getCitites().subscribe(data =>{
      this.loadingLocations = false;
      this.city = data.cities;      
      console.log(this.city);      
    },error =>{
      this.loadingLocations = false;
    })
  }
  fetchTravelingDates(){
    this.main_service.getTravelDates().subscribe(dates  =>{
      this.travelingDates = dates.dates;
      console.log(this.travelingDates);
    })
  }

  ngOnInit() {
  }
  searchVehicle(){ 
    this.searchingVehcles = true;   
    this.availableVehicles = [];
    this.no_vehicles_message = null;    
    console.log(this.travelForm.value);
    this.main_service.getAvaliableVehicle(this.travelForm.value).subscribe(data =>{
      this.searchingVehcles = false;    
      this.availableVehicles = data.buses;
      console.log(this.availableVehicles.length);
      if(this.availableVehicles.length  <= 1  ){
        this.no_vehicles_message = "No Vehicles Available"
      }

    })
  }
  loadMore(bus:Bus){   
    let navigationExtras: NavigationExtras  = {
      queryParams:{
        from_city: this.travelForm.controls.from_city.value,
        to_city:this.travelForm.controls.to_city.value,      
        travel_date:this.travelForm.controls.travel_date.value,
        selected_vehicle:bus.id,
        selected_vehicle_name:bus.name,

      }
    }
    console.log(JSON.stringify(navigationExtras))
    this.router.navigate(['busDetails'],navigationExtras);
  }

}
        

