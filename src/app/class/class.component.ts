import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
})
export class ClassComponent implements OnInit {
  classes:any= []
  constructor(public router:Router,public http:HttpClient) { }
  
  routeTosubjects(classId: any) {
   this.router.navigate(['/tabs/lectures'],{queryParams : { classId : classId}})
  }
   
  ngOnInit() {
   this.getAllClasses()
  }

  async getAllClasses() {
    try {
      let response:any = await this.http.get(environment.nodeApi + 'classes').toPromise();
      if (response.status == 200) {
        this.classes =  response['message']
      } else {
      this.classes = []
    }
    } catch (error) {
      this.classes = []
    }
  }

}
