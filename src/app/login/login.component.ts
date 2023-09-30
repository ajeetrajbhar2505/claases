import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from '../web.service';
import { environment } from 'src/environments/environment';

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

  LogiinWithGoogle(){ 
    window.location.href = environment.nodeApi + 'google'
  }


  login() {
    this.service.login()
  }
}
