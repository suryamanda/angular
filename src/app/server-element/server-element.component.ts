import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit {

  @Input('srvElement') element: {type: string, name: string, content: string};
//we can also pass the name of the variable being used outside of this component
//@Input('srvElement')
  constructor() { }

  ngOnInit() {
  }

}
