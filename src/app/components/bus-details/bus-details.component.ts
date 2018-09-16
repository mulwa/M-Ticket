import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainService } from './../../main.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Seats } from '../../models/seats';
import { username, api_key, hash } from '../../models/constants';
import { TickeType } from '../../models/ticketType';
import { TicketMessage } from '../../models/ticketMessage';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-bus-details',
  templateUrl: './bus-details.component.html',
  styleUrls: ['./bus-details.component.css']
})
export class BusDetailsComponent implements OnInit {
  busDetails:any;
  from_city:number;
  to_city:number;
  travel_date:string;
  selected_vehicle:number;
  newBussDetails:Seats;
  selected_vehicle_name:string;

  selected_seat:number;

  totalSeats: number;
  seatsArray;
  seater:number;

  ticketCost:number;
  ticket_price:string;

  ticketDetails:TickeType;
  tickeRosMessage:TicketMessage;

  checkOutForm:FormGroup;
  showCheckOut:boolean;
  showReservationProcess:boolean;

  constructor(private route: ActivatedRoute,private mainService:MainService,
     private formBuilder:FormBuilder,private _flashMessagesService: FlashMessagesService,
     private router:Router) {
    this.showCheckOut = false; 
    this.showReservationProcess =  false;
      

    this.route.queryParams.subscribe(params =>{     
      this.from_city = params["from_city"];
      this.to_city = params["to_city"];
      this.travel_date = params["travel_date"];
      this.selected_vehicle = params["selected_vehicle"];
      this.selected_vehicle_name = params["selected_vehicle_name"]; 
    })
  }

  ngOnInit() {
    this.getVehicleDetails();
    this.initializeForm();
  }
  getVehicleDetails(){
    this.mainService.getVehicleDetails(this.from_city,this.to_city,this.travel_date,this.selected_vehicle)
    .subscribe(data =>{
      console.log(data)
      this.newBussDetails = data.seats;
      this.seater = this.newBussDetails[0].seater;
      console.log('seater'+this.seater)
      console.log('seater is '+this.seater);
      this.seatsArray = this.newBussDetails[0].name.split(',');
      this.totalSeats  = this.seatsArray.length;

    })
  }
  initializeForm(){
    this.checkOutForm = this.formBuilder.group({
      username:username,
      api_key:api_key,
      action:'ReserveSeats',
      from_city:this.from_city,
      to_city:this.to_city,
      travel_date:this.travel_date,
      hash:hash,
      selected_vehicle:this.selected_vehicle,
      seater:[''],      
      selected_ticket_type:'1',
      payment_method:'3',
      selected_seat:'5A',
      phone_number:['',Validators.minLength(10)],
      id_number:[''],
      passenger_name:['',Validators.required],
      email_address:[''],
      insurance_charge:'',
      served_by:'test user',
      amount_charged:'10',
      reference_number:''

    })   
  }
  checkOut(){
    this.showCheckOut = true;    
    this.getTicket();
    this.checkOutForm.patchValue({
      'seater':this.seater,
      
    });
  }
  onCheckOut(){
    this.showReservationProcess =  true;
    console.log(console.log(this.checkOutForm.value))
    this.mainService.reserveBooking(this.checkOutForm.value).subscribe(data =>{
      this.showReservationProcess   = false;
      if(data.response_code  == 0){
        this.tickeRosMessage = data.ticket_message;
        console.log(this.tickeRosMessage);
        let tick_message = this.tickeRosMessage[0].name;
        this._flashMessagesService.show(tick_message, { cssClass: 'alert-success',timeout:4000 } );
        this.checkOutForm.reset();
        setTimeout(()=>{
          this.router.navigate(['home']);
        },5000)
      }else{
        this._flashMessagesService.show(data.response_message, { cssClass: 'alert-danger',timeout:5000 } );
      }


    })
  }
  getTicket(){
    console.log("calling get ticket details");
    let finalstring = this.selected_seat.toString()
    this.mainService.getTicketDetails(this.from_city
      ,this.to_city,this.travel_date,this.selected_vehicle,this.seater,"5A").subscribe(data =>{
        console.log(data)
        if(data.response_code ==0){
          this.ticketDetails = data.ticket_type;
          console.log(this.ticketDetails)
          this.ticket_price = this.ticketDetails[0].fare_per_ticket;
          console.log('ticket price'+this.ticket_price);
          this.ticketCost = parseInt(this.ticket_price) * this.selected_seat;
          console.log('total cost'+this.ticketCost);
        }
      
    })
    
  }

}
