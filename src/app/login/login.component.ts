import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from '../web.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  visiblepass: boolean = false;
  showpassword() {
    this.visiblepass = !this.visiblepass;
  }
  constructor(public router:Router,public service:WebService) {}

  ngOnInit(): void {

  }
  login() {
    this.service.login()
  }
}
