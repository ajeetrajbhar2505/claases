import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent implements OnInit {
  @Input() uploadStatus = { status : false , message : ''}
  @Output() snackbarStatus = new EventEmitter()
  constructor() {
    setTimeout(() => {
      this.snackbarStatus.emit(false)
    }, 2000);
   }

  ngOnInit() {}

}
