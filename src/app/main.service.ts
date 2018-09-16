import { userAuth } from './models/UserAuth';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl, username, api_key, hash } from './models/constants';
import { travelDateResponse } from './models/travelDateResponse';
import { locationResponse } from './models/locationResponse';
import { AvailableBusResponse } from './models/availablebuses';
import { responseI } from './models/response';
import { ReservationRes } from './models/reservationResponse';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(public http: HttpClient) { 
    console.log('service constuctor called')
  }
  login(user:userAuth){
    return this.http.post(baseUrl,user);
  }
  getTravelDates(){
    const cityParams = {
      username: username,
      api_key: api_key,
      action:"AvailableDates"    
    }
    return this.http.post<travelDateResponse>(baseUrl,cityParams);
  }
  getCitites(){   
    const cityParams = {
      username: username,
      api_key: api_key,
      action:"AvailableCities"    
    }
    return this.http.post<locationResponse>(baseUrl,cityParams);
  }
  getAvaliableVehicle(body:any){   
    return this.http.post<AvailableBusResponse>(baseUrl,body);
  }
  getVehicleDetails(from:number,to_id:number, travel_date:string,selected_vehicle:number){
    let body = {
      username: username,
      api_key: api_key,
      action:"AvailableSeats",
      hash:hash,
      from_city:from,
      to_city:to_id,
      travel_date:travel_date,
      selected_vehicle:selected_vehicle         
    }
    console.log(body)
    return this.http.post<responseI>(baseUrl,body);

  }
  
  getTicketDetails(from:number,to_id:number, travel_date:string,selected_vehicle:number,seater:number,selected_seat:string){
    let body = {
      username: username,
      api_key: api_key,
      action:"TicketTypes",
      hash:hash,
      from_city:from,
      to_city:to_id,
      travel_date:travel_date,
      selected_vehicle:selected_vehicle,
      selected_seat:selected_seat,
      seater:seater     
              
    }
    console.log(body)
    return this.http.post<responseI>(baseUrl,body);

  }
  reserveBooking(bookingDetails:any){
    return this.http.post<ReservationRes>(baseUrl,bookingDetails)

  }
}
