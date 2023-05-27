import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent implements OnInit {
  uploadStatus = { status: false, statusType: '', message: '' }
  @Input() set getuploadStatus(value: any) {
    this.uploadStatus = value
    this.currentStatusIcon = this.statusIcons.filter(obj => obj.status == this.uploadStatus.statusType)[0].name
  }
  @Output() snackbarStatus = new EventEmitter()
  statusIcons = [
    { name: 'checkmark-circle-outline', status: 'success' },
    { name: 'close-circle-outline', status: 'failed' },
    { name: 'information-circle-outline', status: 'info' },
  ]
  currentStatusIcon: any = ""
  constructor() {
    setTimeout(() => {
      this.snackbarStatus.emit(false)
    }, 2000);
  }

  ngOnInit() { }

}
