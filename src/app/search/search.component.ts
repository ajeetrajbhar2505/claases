import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  private stopRecording$ = new Subject<void>();
  searchGroup!: FormGroup
  loading = false
  recordingStarted = false
  recognition: any
  @ViewChild('content') private content: any;

  constructor(public http: HttpClient, public formbuilder: FormBuilder) { }

  ngOnInit() {
    this.createFormgroup()
    this.recognition = (window as any).recognition;

  }

  createFormgroup() {
    this.searchGroup = this.formbuilder.group({
      array: new FormArray([this.anothergroup()])
    })
  }

  anothergroup(): FormGroup {
    return this.formbuilder.group({
      question: new FormControl(''),
      answer: new FormControl(''),
      searched: false,
      minutes: 0,
      seconds: 0
    })
  }


  searchArrayControl() {
    return (this.searchGroup.get('array') as FormArray).controls
  }


  push() {
    let array = this.searchGroup.get('array') as FormArray
    array.push(this.anothergroup())
  }


  async getResponse(index: any) {
    this.scrollToBottomOnInit();
    this.loading = true
    let array = this.searchGroup.get('array') as FormArray
    let question = array.at(index).get('question')?.value
    array.at(index).get('searched')?.patchValue(true)
    let body = {
      question: question
    }

    let response: any = await this.http.post(environment.nodeApi + '/questionResponse', body).toPromise()
      this.push()
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


  startFunction(index: any) {
    const array: any = this.searchGroup.get('array') as FormArray;
    if (!this.recognition || this.recognition && this.recognition.grammars.length === 0) {
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';
      this.recognition.maxAlternatives = 1;
    }
    if (!this.recordingStarted) {
      try {
        this.recordingStarted = true;
        let secondsElapsed = 0;
        array.at(index).get('minutes')?.setValue(0);
        array.at(index).get('seconds')?.setValue(0);
        let timerInterval = setInterval(() => {
          secondsElapsed++;
          array.at(index).get('minutes')?.patchValue(Math.floor(secondsElapsed / 60));
          array.at(index).get('seconds')?.patchValue(secondsElapsed % 60);
          if (!this.recordingStarted) {
            clearInterval(timerInterval);
          }
        }, 1000);
  
        this.recognition.onresult = (event: any) => {
          const result = event.results[0][0].transcript;
          array.at(index).get('question')?.patchValue(result);
          this.getResponse(index);
          this.recordingStarted = false;
        };
        this.recognition.start();
      } catch (e) {
        console.log(e);
      }
    }
  }
  
  
  stopFunction(index: any) {
    const array: any = this.searchGroup.get('array') as FormArray;
    if (this.recognition && this.recordingStarted) {
      try {
        this.recognition.stop();
        this.recordingStarted = false;
        this.recognition.onresult = (event: any) => {
          const result = event.results[0][0].transcript;
          array.at(index).get('question')?.patchValue(result);
          this.getResponse(index);
        };
      } catch (e) {
        console.log(e);
      }
    }
  }
  


}
