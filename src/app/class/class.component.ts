import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
})
export class ClassComponent implements OnInit {
  classes:any= []
  constructor(public router:Router) { }
  
  routeTosubjects(classId: any) {
   this.router.navigate(['/tabs/lectures'],{queryParams : { classId : classId}})
  }
   
  ngOnInit() {
    for (let i = 1; i  <= 10; i++) {
      this.classes.push({ classNamme : 'Standard '+i, classId : i, std_icon : "assets/std_icon.webp"})
    }
  }

}
