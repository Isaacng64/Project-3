import { LightningElement } from "lwc";

/* Container element for the audioPlayer, metronome, and autoplayer components to work together */

export default class Soundboard extends LightningElement {
  nextNotes = [];

  tickHandle(event) {
    this.nextNotes = [];

    let tickVolume = event.detail;

    this.template.querySelector("c-autoplayer").tickCallback();

    console.log(this.nextNotes);

    this.nextNotes.forEach((note) =>{
      this.template
      .querySelector("c-audio-player").playPiano(note, 1); /* second arg is duration in # beats */
    })

    this.template
      .querySelector("c-audio-player")
      .tickCallback(tickVolume);
  }

  autoPlayHandle(event) {
    this.nextNotes.push(event.detail);
  }


  playbass(){ //test
    this.template.querySelector("c-audio-player").playBass("E", 5, 2);
  }
}
