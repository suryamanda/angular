import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  signupForm: FormGroup;
  defaultSubscription = "advanced";
  forbiddenName = 'Test';
  submitted=false;

  ngOnInit() {
    this.signupForm = new FormGroup({
      'projectname' : new FormControl(null, [Validators.required, this.forbiddenProjectName.bind(this)]),
      'mail': new FormControl(null, [Validators.required, Validators.email]),
      'projectstatus': new FormControl('stable')
    });
      
  }

  onSubmit(){
    this.submitted= true;
   console.log(this.signupForm);
  }

  forbiddenProjectName(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenName === control.value) {
      return {'nameIsForbidden': true};
    }
    return null;
  }
  
  
  forbiddenProjectNameAsync(control : FormControl) : Promise<any> | Observable<any>{
const promise = new Promise<any>((resolve, reject) => {
setTimeout(()=> {
  if(control.value === 'Test'){
    resolve({projectNameForbidden: true});

  }else{
    resolve(null);
  }
}, 1000);
});
return promise;
}

  
}
