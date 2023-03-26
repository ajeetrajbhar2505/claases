import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor() { }


  speech(textToSpeech: string) {
    // create a new instance of the SpeechSynthesis interface
    const synth = window.speechSynthesis;

    // create a new SpeechSynthesisUtterance object with the desired text
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

}
