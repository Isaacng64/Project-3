import { LightningElement, api } from 'lwc';

export default class FeaturePage extends LightningElement {

  @api
  nowGuitar;

  @api
  nowPiano;

  @api
  nowSongwriter;

  initialized;

  connectedCallback(){
    if(!this.initialized){
      this.nowGuitar = true;
      this.initialized = true;
    }
  }

  @api
  setChordBook(changeTo){
    if(changeTo === 'Piano') {
    this.template.querySelector('.chords').activatePiano();
    } else {
      this.template.querySelector('.chords').activateGuitar();
    }
  }

}