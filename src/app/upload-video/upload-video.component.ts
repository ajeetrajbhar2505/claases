import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { WebService } from '../web.service';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss'],
})
export class UploadVideoComponent implements OnInit {
  lecturesData: any[] = []
  classData: any = []
  params: any = {}
  uploadVideogroup = new FormGroup({
    classId: new FormControl(''),
    lec_id: new FormControl(''),
    content_icon: new FormControl(''),
    content_link: new FormControl(''),
    content_title: new FormControl(''),
    contentId: new FormControl(''),
    content: new FormControl('video'),
    published_at: new FormControl(''),
    content_file: new FormControl(''),
  })
  currentContent: any = ""
  uploading: boolean = false
  uploadStatus: any = { status: false, message: '' }

  constructor(public http: HttpClient, private sanitizer: DomSanitizer, public router: Router, public service: WebService, public ActivatedRoute: ActivatedRoute) {
    this.uploadVideogroup.get('published_at')?.patchValue(this.service.getCurrentDate())
    ActivatedRoute.queryParams.subscribe((params: any) => {
      this.params = params
      this.uploadVideogroup.get('content')?.patchValue(params.content)
    })
  }

  async ngOnInit() {
    this.classData = await this.http.get('assets/classWiseLectures.json').toPromise()
  }

  readUrl(event: any) {
    this.uploadVideogroup.get("content_file")?.patchValue(event.target.files[0]);
    this.uploadVideogroup.get("content_link")?.patchValue(event.target.files[0].name);
  }


  getImgContent(url: any): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  async getSubjectsByclassId(event: any) {
    let classId = event.target.value
    await this.http.get('assets/classWiseLectures.json').toPromise().then((response: any) => {
      response.filter((data: any) => {
        if (data.classId == classId) {
          this.lecturesData = data['subjects']
        }
      })

    })
  }

  switchContent(content: any) {
    this.currentContent = content
    this.uploadVideogroup.get('content')?.patchValue(content)
  }

  onchange_lecture(event: any) {

    this.lecturesData.filter((data: any) => {
      if (data.lec_id == this.uploadVideogroup.get('lec_id')?.value) {
        this.uploadVideogroup.get('content_icon')?.patchValue(data.lec_icon)
      }
    })
  }

  backToContent() {
    const queryParams = {
      classId: this.params.classId,
      lec_id: this.params.lec_id,
      contentId: this.params.contentId,
      from: '/tabs/lectures'
    };
    this.router.navigate([this.params.from], { queryParams });
  }

  async uploadContent() {

    this.uploading = true
    let body: any = { ...this.uploadVideogroup.value }

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

  async uploadExcel(event: any) {
    this.uploadStatus.status = true
    this.uploadStatus = await this.service.uploadExcelFile(event.target.files[0])
  }

  getSnackbarStatus(status:any){
    this.uploadStatus.status = status
  }

}
