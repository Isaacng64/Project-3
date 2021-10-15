import { LightningElement, api } from 'lwc';
import fretImage from '@salesforce/resourceUrl/fret';

export default class GuitarFret extends LightningElement {

  @api fretImg = fretImage;
  @api currentFret;

  //append .highlighted class to fret div when clicked
  setFret(){
    this.dispatchEvent(new CustomEvent('passfret', {detail: this.currentFret}));
  }
}