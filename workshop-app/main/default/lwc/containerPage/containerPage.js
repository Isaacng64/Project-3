import { LightningElement, api } from 'lwc';
import logo from '@salesforce/resourceUrl/MusicWorkshopLogo';

export default class ContainerPage extends LightningElement {
  
  logoimage = logo;

  piano(){
    this.template.querySelector('c-feature-page').nowPiano = true;
    this.template.querySelector('c-feature-page').nowGuitar = false;
    this.template.querySelector('c-feature-page').nowSongwriter = false;
    this.template.querySelector('c-feature-page').nowBass = false;
    this.template.querySelector('c-feature-page').setChordBook('Piano');
  }

  guitar(){
    this.template.querySelector('c-feature-page').nowPiano = false;
    this.template.querySelector('c-feature-page').nowGuitar = true;
    this.template.querySelector('c-feature-page').nowSongwriter = false;
    this.template.querySelector('c-feature-page').nowBass = false;
    this.template.querySelector('c-feature-page').setChordBook('Guitar');
  }

  songwriter(){
    this.template.querySelector('c-feature-page').nowPiano = false;
    this.template.querySelector('c-feature-page').nowGuitar = false;
    this.template.querySelector('c-feature-page').nowSongwriter = true;
    this.template.querySelector('c-feature-page').nowBass = false;
    this.template.querySelector('c-feature-page').setChordBook('Piano');
  }

  bass(){
    this.template.querySelector('c-feature-page').nowPiano = false;
    this.template.querySelector('c-feature-page').nowGuitar = false;
    this.template.querySelector('c-feature-page').nowSongwriter = false;
    this.template.querySelector('c-feature-page').nowBass = true;
    this.template.querySelector('c-feature-page').setChordBook('Bass');
  }
}