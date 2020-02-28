import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  @ViewChild('f', { static: false }) signupForm: NgForm;
  defaultSubscription = "advanced";

  user = {
    email : '',
    password:'',
    subscription:''
  }

  submitted = false;

  ngOnInit() {
   
    
  }

  onSubmit(){
    console.log(this.signupForm);
    this.submitted=true;
    this.user.email=this.signupForm.value.mail;
    this.user.subscription=this.signupForm.value.subscription;
    this.user.password=this.signupForm.value.password;
    this.signupForm.reset();
  
  }

  
}
