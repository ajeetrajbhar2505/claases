import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
    lec_title : new FormControl(''),
    video_link : new FormControl(''),
    video_title : new FormControl('')
  })
  constructor(public http:HttpClient,private sanitizer: DomSanitizer) { }

 async ngOnInit() {
  this.classData = await this.http.get('assets/classWiseLectures.json').toPromise()
 }

 readUrl(event: any) {
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();

    reader.onload = (event: ProgressEvent) => {
      let url:any = (<FileReader>event.target).result;
      this.uploadVideogroup.get("video_link")?.patchValue(url);
    };

    reader.readAsDataURL(event.target.files[0]);
  }
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

}
