import { LightningElement, api } from 'lwc';
import strumImage from '@salesforce/resourceUrl/strum'

export default class GuitarBaseString extends LightningElement 
{    
    frets = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
    
    currentFret;
    @api stringNumber;
    @api strumImg = strumImage + '.png';


    setCurrentFret(event)
    {
        this.currentFret = event.detail;
        this.dispatchEvent(new CustomEvent('passcurentfret', {detail: [this.currentFret, this.stringNumber]}));
    }
}