import { LightningElement } from "lwc";

export default class Soundboard extends LightningElement {
  nextNotes = [];

  tickHandle(event) {
    this.nextNotes = [];

    let tickVolume = event.detail;

    this.template.querySelector("c-autoplayer").tickCallback();

    console.log(this.nextNotes);

    this.nextNotes.forEach((note) =>{
      this.template
      .querySelector("c-audio-player").playPiano(note, 2); // second arg is duration in # beats
    })

    this.template
      .querySelector("c-audio-player")
      .tickCallback(tickVolume);//, this.nextNotes);
  }

  autoPlayHandle(event) {
    this.nextNotes.push(event.detail);
  }
}
