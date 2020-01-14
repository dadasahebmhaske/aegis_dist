import {Injectable} from '@angular/core';

declare var $: any;

@Injectable()
export class NotificationService {

  constructor() {
  }

  smallBox(data, cb?) {
    $.smallBox(data, cb)
  }

  bigBox(data, cb?) {
    $.bigBox(data, cb)
  }

  smartMessageBox(data, cb?) {
    $.SmartMessageBox(data, cb)
  }
  Success = function (Message) {
    $.bigBox({
        title: Message,
        color: "#296191",
        icon: "fa fa-thumbs-up animated bounce ",
        timeout: "2000"
    });
  }
  Errmsg = function (Message) {
    $.bigBox({
        title: Message,
        color: "#C46A69",
        icon: "fa fa-warning shake animated",
        timeout: 3000
    });
}
    
}
