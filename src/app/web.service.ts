import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  private token: string = '';

  local = "http://192.168.31.159:3000"
  socket:any
  constructor(private router:Router) {
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


  getCurrentDate(){
    const today: Date = new Date();
    const dd: string = String(today.getDate()).padStart(2, '0');
    const mm: string = String(today.getMonth() + 1).padStart(2, '0');
    const yy: string = String(today.getFullYear());
    const formattedDate: string = `${dd}-${mm}-${yy}`;
   return formattedDate
  }


  login(): void {
    // TODO: Make API call to retrieve token
    this.token = 'sample-token';
    // Redirect to home page after login
    this.router.navigate(['/tabs/home']);
  }

  logout(): void {
    // Clear token
    this.token = '';
    // Redirect to login page after logout
    this.router.navigate(['/tabs/login']);
  }

  getToken(): string {
    return this.token;
  }

}
