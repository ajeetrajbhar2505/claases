import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent implements OnInit {
  @Input() set getuploadStatus(value:any) {
  this.currentStatusIcon = this.statusIcons.filter(obj=> obj.status == value.statusType)[0].name
  }
  @Input() uploadStatus = { status : false ,statusType: '', message : ''}
  @Output() snackbarStatus = new EventEmitter()
  statusIcons = [
    {name : 'checkmark-circle-outline',status : 'success'},
    {name : 'close-circle-outline',status : 'failed'},
    {name : 'information-circle-outline',status : 'info'},
  ]
  currentStatusIcon:any = ""
  constructor() {
    setTimeout(() => {
      this.snackbarStatus.emit(false)
    }, 2000);
   }
   
  ngOnInit() {}

}
