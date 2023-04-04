import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { WebService } from '../web.service';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss'],
})
export class UploadVideoComponent implements OnInit {
  lecturesData:any[] = []
  classData:any = []
  uploadVideogroup = new FormGroup({
    classId : new FormControl(''),
    lec_id : new FormControl(''),
    content_icon : new FormControl(''),
    content_link : new FormControl(''),
    content_title : new FormControl(''),
    contentId : new FormControl(''),
    content : new FormControl('video'),
    published_at : new FormControl(''),
    video : new FormControl(''),
  })
  currentContent = "video"
  uploading:boolean = false

  constructor(public http:HttpClient,private sanitizer: DomSanitizer,public router:Router,public service:WebService) {
   this.uploadVideogroup.get('published_at')?.patchValue(this.service.getCurrentDate())
   }

 async ngOnInit() {
  this.classData = await this.http.get('assets/classWiseLectures.json').toPromise()
 }

 readUrl(event: any) {
  this.uploadVideogroup.get("video")?.patchValue(event.target.files[0]);
  this.uploadVideogroup.get("content_link")?.patchValue(event.target.files[0].name);
}


getImgContent(url: any): SafeUrl {
  return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}

 async getSubjectsByclassId(event:any)
 {
  let classId = event.target.value
    await this.http.get('assets/classWiseLectures.json').toPromise().then((response:any)=>{   
    response.filter((data:any) =>  { 
      if (data.classId == classId) {
        this.lecturesData = data['subjects']
      }
      })
      
  })
 }

 switchContent(content:any)
 {
   this.currentContent = content
   this.uploadVideogroup.get('content')?.patchValue(content)
 }
 
 onchange_lecture(event:any)
 {
 
  this.lecturesData.filter((data:any) =>  { 
    if (data.lec_id ==  this.uploadVideogroup.get('lec_id')?.value) {
      this.uploadVideogroup.get('content_icon')?.patchValue(data.lec_icon)
    }})
 }

 backToHome()
 {
  this.router.navigate(['/tabs/home'])
 }

async uploadContent()
 {

  this.uploading = true
  let body:any = {...this.uploadVideogroup.value}
  console.log({body  :body});

// create a new FormData object
const formData = new FormData();
for (const key in body) {
  if (body.hasOwnProperty(key)) {
    formData.append(key, body[key]);
  }
}

  // formData can now be sent in an HTTP request
  // try {
  //   let response:any = await this.http.post(environment.nodeApi + '/uploadVideo',formData).toPromise()
  //   if (response.status == 204) {
  //    this.uploading = false
  //   }
  // } catch (error) {
  //   this.uploading = false
  // }

 }

}
