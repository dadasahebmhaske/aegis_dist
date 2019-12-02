import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sa-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
public insurance:boolean;
  constructor() { }

  ngOnInit() {
  }

}
