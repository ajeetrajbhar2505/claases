import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { WebService } from '../web.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchGroup!:FormGroup
  loading = false
  socket:any
  @ViewChild('content') private content: any;

  constructor(public http:HttpClient,public formbuilder:FormBuilder,public service:WebService) { }
   
  ngOnInit() {
    this.createFormgroup()
  }

  createFormgroup()
  {
    this.searchGroup = this.formbuilder.group({
      array : new FormArray([this.anothergroup()])
    }) 
  }

  anothergroup():FormGroup{
    return this.formbuilder.group({
      question : new FormControl(''),
      answer : new FormControl(''),
      searched : false
    })
  }


  searchArrayControl()
  {
    return(this.searchGroup.get('array') as FormArray).controls
  }


  push()
  {
    let array =  this.searchGroup.get('array') as FormArray
    array.push(this.anothergroup())
  }


 async getResponse(index:any)
  {
    this.scrollToBottomOnInit();
    this.loading =  true
    this.push()
    let array =  this.searchGroup.get('array') as FormArray
    let question = array.at(index).get('question')?.value
     array.at(index).get('searched')?.patchValue(true)
    let body = {
      question : question
    }
    
   let response:any = await this.http.post(environment.nodeApi + '/questionResponse',body).toPromise()
   if (response.status == 200) {
    this.loading = false
     this.scrollToBottomOnInit();
    array.at(index).get('answer')?.patchValue(response.data)
   } else {
    this.loading = false
     this.scrollToBottomOnInit();
    array.at(index).get('answer')?.patchValue('Not Found')
   }
  }


  scrollToBottomOnInit() {
    this.content.scrollToBottom(300);
  }

  scrollToTopOnInit() {
    this.content.scrollToTop(300);
  }

  sendMessage()
  {
    const message = {
      "contentId": "2",
      "content": "video",
      "content_icon": "assets/maths.webp",
      "content_link": "Tables1_to_10 __ English_Table_of One_to_Ten_Tables_Song_Maths.mp4",
      "content_title": "Tables1 to 10 || English Table of One to Ten Tables Song ",
      "published_at": "18/02/2023",
      "teacher" : "ajeet rajbhar",
    }

    this.service.socket.emit('live',message)

  }

}
