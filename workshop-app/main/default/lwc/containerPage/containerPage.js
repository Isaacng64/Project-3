import { LightningElement, api } from 'lwc';
import logo from '@salesforce/resourceUrl/MusicWorkshopLogo';

export default class ContainerPage extends LightningElement {
  
  logoimage = logo;
  currentPage;

  piano(){
    this.currentPage = 'Piano';
    this.template.querySelector('c-feature-page').nowPiano = true;
    this.template.querySelector('c-feature-page').nowGuitar = false;
    this.template.querySelector('c-feature-page').nowSongwriter = false;
    this.template.querySelector('c-feature-page').setChordBook('Piano');
  }

  guitar(){
    this.currentPage = 'Guitar';
    this.template.querySelector('c-feature-page').nowPiano = false;
    this.template.querySelector('c-feature-page').nowGuitar = true;
    this.template.querySelector('c-feature-page').nowSongwriter = false;
    this.template.querySelector('c-feature-page').setChordBook('Guitar');
  }

  songwriter(){
    this.currentPage = 'Songwriter';
    this.template.querySelector('c-feature-page').nowPiano = false;
    this.template.querySelector('c-feature-page').nowGuitar = false;
    this.template.querySelector('c-feature-page').nowSongwriter = true;
    this.template.querySelector('c-feature-page').setChordBook('Piano');
  }
}