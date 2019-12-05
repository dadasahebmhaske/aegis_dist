import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styles: []
})
export class ForgotComponent implements OnInit {
  public state: any = {
    tabs: {
      demo1: 0,
  
    },

    carousel: {
      demo1: {
        interval: 2000,
        noWrap: false,
        slides: [
          {
            title: 'Title 1',
            text: 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.',
            src: 'assets/img/banner1.jpg',
          },
          {
            title: 'Title 2',
            text: 'Dolores justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.',
            src: 'assets/img/banner1.jpg',
          }
        ]
      }
    }
  };
  constructor(private router: Router) { }

  ngOnInit() {
  }

  submit(event){
    event.preventDefault();
    this.router.navigate(['/dashboard/+analytics'])
  }
}
