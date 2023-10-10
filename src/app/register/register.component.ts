import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from '../web.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  visiblepass = [false, false];
  constructor(public router:Router,public service:WebService) {}

  ngOnInit(): void {

  }

  showpassword(index: number) {
    this.visiblepass[index] = !this.visiblepass[index];
  }
  
  LogiinWithGoogle(){ 
    window.location.href = environment.nodeApi + 'google'
  }

  register() {
    this.service.login()
  }
}
