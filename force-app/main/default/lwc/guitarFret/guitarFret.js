import { LightningElement, api } from 'lwc';
import fretImage from '@salesforce/resourceUrl/fret';

export default class GuitarFret extends LightningElement {

  @api fretImg = fretImage + '.png';

  //append .highlighted class to fret div when clicked

}