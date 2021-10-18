import { LightningElement, api } from 'lwc';
import fretImage from '@salesforce/resourceUrl/fret_bass';

export default class GuitarBaseFret extends LightningElement 
{
    @api fretImg = fretImage + '.png';
    @api currentFret;

    
    setFret()
    {
        this.dispatchEvent(new CustomEvent('passfret', {detail: this.currentFret}));
    }
}