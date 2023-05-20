import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';


@Injectable({
  providedIn: 'root',
  
})
export class WebService {
  private isLoggedIn = false;
  public isSplashLoaded = false;
  public alertButtons = ['OK'];



  local = "http://192.168.31.159:3000"
  socket: any
  constructor(private router: Router, public http: HttpClient) {
    this.socket = io(environment.nodeApi, {
      transports: ['websocket']
    });
  }





  speech(textToSpeech: string) {
    // create a new instance of the SpeechSynthesis interface
    const synth = window.speechSynthesis;

    // create a new SpeechSynthesisUtterance object with the desired text
    console.log(textToSpeech);

    const utterance = new SpeechSynthesisUtterance(textToSpeech);

    // get all available voices
    const voices = synth.getVoices();
    console.log({ voices: voices });


    // find a male voice (if available)
    let maleVoice = null;
    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name.includes('Google हिन्दी')) {
        maleVoice = voices[i];
        break;
      }
    }

    // set the voice of the utterance to the male voice (if available)
    if (maleVoice) {
      utterance.voice = maleVoice;
    }

    utterance.voice = maleVoice;
    utterance.lang = 'hi-IN';


    // queue the utterance for synthesis
    synth.speak(utterance);
  }

  speechToText() {
    // Create a new instance of the SpeechSynthesisUtterance class
    const utterance = new SpeechSynthesisUtterance();

    // Set the voice to use for speech synthesis
    utterance.voice = speechSynthesis.getVoices()[0];

    // Set the volume, pitch, and rate of speech
    utterance.volume = 1;
    utterance.pitch = 1;
    utterance.rate = 1;

    // Get all the text nodes in the document
    const textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);

    // Create an empty string to hold all the text
    let allText = '';

    // Loop through all the text nodes and add their text to the allText string
    while (textNodes.nextNode()) {
      allText += textNodes.currentNode.textContent;
    }

    // Set the text to be spoken
    utterance.text = allText;

    // Speak the text
    speechSynthesis.speak(utterance);

  }


  getCurrentDate() {
    const today: Date = new Date();
    const dd: string = String(today.getDate()).padStart(2, '0');
    const mm: string = String(today.getMonth() + 1).padStart(2, '0');
    const yy: string = String(today.getFullYear());
    const formattedDate: string = `${dd}-${mm}-${yy}`;
    return formattedDate
  }


  login(): void {
    // TODO: Implement login logic
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true')
    this.router.navigate(['/tabs/home']);
  }

  logout(): void {
    // Clear login status
    this.isLoggedIn = false;
    localStorage.setItem('isLoggedIn', 'false')
    // Clear cache and redirect to login page
    setTimeout(() => {
      this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/login']);
      });
    }, 100);
  }

  checkLoggedIn(): boolean {
    // return this.isLoggedIn;
    return localStorage.getItem('isLoggedIn') == 'true' ? true : false;
  }


  // Function to read the Excel file and retrieve headers and data
  readExcelFile(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        resolve(jsonData);
      };

      reader.onerror = (e) => {
        reject(e);
      };

      reader.readAsArrayBuffer(file);
    });
  }

  // Function to extract headers and their values from the Excel data
  extractHeadersData(data: any[][]): { header: string, array: any[] }[] {
    const headers = data[0];
    const values = data.slice(1);
    const result = [];

    for (let i = 0; i < headers.length; i++) {
      result.push({
        header: headers[i],
        array: values.map((row) => row[i]),
      });
    }

    return result;
  }



  async uploadExcelFile(file: File) {
    let uploadResponse = {status : null,message : ''}
    let response:any = ""
    try {
      if (file) {
        const excelData = await this.readExcelFile(file);
        const headerData = this.extractHeadersData(excelData);
        let body  = { data : headerData}
        response = await this.postData(environment.nodeApi, body).toPromise();
  
        uploadResponse.message = response.status === 200 ? 'File was successfully uploaded' : 'Error reading Excel file';
      }
    } catch (error) {
      uploadResponse.message = 'Error reading Excel file';
    }
    return uploadResponse.status = response.status
  }
  

  postData(url: string, data: any, headers?: any) {
    return this.http.post(url, data, { headers: headers })
  }

  getData(url: string, data: any, headers?: any) {
    return this.http.get(url, { headers: headers })
  }




}
