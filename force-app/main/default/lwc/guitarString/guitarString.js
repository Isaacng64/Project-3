import { LightningElement, api } from 'lwc';

export default class GuitarString extends LightningElement {

    frets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

    currentFret;
    @api stringNumber;

    setCurrentFret(event){
        this.currentFret = event.target.value;
        this.dispatchEvent(new CustomEvent('passcurrentfret', {detail: [this.currentFret, this.stringNumber]}));
    }

}