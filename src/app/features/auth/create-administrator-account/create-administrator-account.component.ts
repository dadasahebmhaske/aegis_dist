import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sa-create-administrator-account',
  templateUrl: './create-administrator-account.component.html',
  styleUrls: ['./create-administrator-account.component.css']
})
export class CreateAdministratorAccountComponent implements OnInit {

 public inputTypeOne = 'password';
 public classNameOne = 'glyphicon-eye-close';
 public inputTypeTwo = 'password';
 public classNameTwo = 'glyphicon-eye-close';

  constructor() { }

  ngOnInit() {
  }
  HideShowPasswordOne() {
    if (this.inputTypeOne == 'password') {
        this.inputTypeOne = 'text';
        this.classNameOne = 'glyphicon-eye-open';
    }
    else {
        this.inputTypeOne = 'password';
        this.classNameOne = 'glyphicon-eye-close';
    }
};HideShowPasswordTwo () {
    if (this.inputTypeTwo == 'password') {
        this.inputTypeTwo = 'text';
        this.classNameTwo = 'glyphicon-eye-open';
    }
    else {
        this.inputTypeTwo = 'password';
        this.classNameTwo = 'glyphicon-eye-close';
    }
};
}
