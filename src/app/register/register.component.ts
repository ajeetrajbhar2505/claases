import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from '../web.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  visiblepass: boolean = false;
  showpassword() {
    this.visiblepass = !this.visiblepass;
  }
  constructor(public router:Router,public service:WebService) {}

  ngOnInit(): void {

  }
  register() {
    this.service.login()
  }
}
