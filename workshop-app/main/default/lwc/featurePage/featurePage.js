import { LightningElement, api } from 'lwc';

export default class FeaturePage extends LightningElement {

  @api
  nowGuitar;

  @api
  nowPiano;

  @api
  nowSongwriter;

  @api 
  nowBass;

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
    } else if (changeTo === 'Guitar'){
      this.template.querySelector('.chords').activateGuitar();
    } else{
      this.template.querySelector('.chords').activateBass();
    }
  }

}