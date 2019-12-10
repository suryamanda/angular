import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  display: boolean = false;
  clicks : any = [];
  count = 0;
  toggleDisplay(){
    this.display= !this.display;
    this.count = ++this.count;
    this.clicks.push(this.count);
    console.log('inside toggle display method'+this.display+' and count : '+this.clicks);
    
  }
 

}
