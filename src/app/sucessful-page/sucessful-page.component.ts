import { Component, OnInit } from '@angular/core';
import { WebService } from '../web.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sucessful-page',
  templateUrl: './sucessful-page.component.html',
  styleUrls: ['./sucessful-page.component.scss'],
})
export class SucessfulPageComponent implements OnInit {

  constructor(public service:WebService,public ActivatedRoute:ActivatedRoute) { }

  ngOnInit() {
    const token = this.ActivatedRoute.snapshot.params['token'];
    const userId = this.ActivatedRoute.snapshot.params['userId'];
    this.service.setlocalstorage(token,userId)
  }

}
