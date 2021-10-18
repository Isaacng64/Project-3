import { LightningElement } from 'lwc';

export default class GuitarInstrument extends LightningElement {

  /*
   * Outer component of Guitar holds all strings and the audio player. On strum,
   * an event is produced holding information on the currently pressed fret and string.
   * The event is handled here and utilizes a method from the audio player to 
   * produce the appropriate sound.
   */
  
  currentFret;
  stringNumber;

  tuning = ['E1', 'A', 'D', 'G', 'B', 'E2'];

  currentFretAndString(event) {
    let result = event.detail;
    this.currentFret = result[0];
    this.stringNumber = result[1];
  }
  
  playGuitar(event) {
    let note = event.detail;
    this.template.querySelector('c-audio-player').playGuitar(note[0], note[1]);
  }
}