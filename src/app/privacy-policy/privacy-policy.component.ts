import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
})
export class PrivacyPolicyComponent implements OnInit {
  constructor(public router: Router) { }
  ngOnInit() {
  }
  backToHome() {
    this.router.navigate(['/tabs/profile'])
  }
}
