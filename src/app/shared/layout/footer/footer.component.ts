import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sa-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
year:any;
  constructor() {}

  ngOnInit() {
    this.year=new Date().getFullYear();
  }

}
