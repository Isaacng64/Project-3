import { LightningElement, api } from 'lwc';
import strumImage from '@salesforce/resourceUrl/strum'
import fretImage from '@salesforce/resourceUrl/fret_bass';


export default class GuitarString extends LightningElement {

    frets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

    currentFret = 0;
    openString = 0;
    @api stringNumber;
    @api strumImg = strumImage;

    @api setFretInString(event){
        this.currentFret = event.detail;
        this.dispatchEvent(new CustomEvent('passcurrentfret', {detail: [this.currentFret, this.stringNumber]}));
    }

    @api strum() {
        let noteToPlay = [this.stringNumber, this.currentFret];
        this.dispatchEvent(new CustomEvent('playbassnote', {detail: noteToPlay}));
        console.log('strumming: ' + noteToPlay);
    }

    @api handlePressed(event){
        let target = event.target;
        let fretComponents = this.template.querySelectorAll('c-guitar-Base-fret');
        for(let i = 0; i < fretComponents.length; i++){
            if(fretComponents[i].currentFret != target.currentFret){
                fretComponents[i].pressed = false;
                fretComponents[i].fretImg = fretImage;
            }
        }
      }

}