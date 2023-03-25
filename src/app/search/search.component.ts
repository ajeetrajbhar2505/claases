import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchGroup!:FormGroup
  loading = false
  @ViewChild('content') private content: any;

  constructor(public http:HttpClient,public formbuilder:FormBuilder) { }
   
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
   console.log(response.data);
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

}
