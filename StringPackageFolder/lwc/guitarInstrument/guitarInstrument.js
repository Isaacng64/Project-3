import { LightningElement, api} from 'lwc';

export default class GuitarInstrument extends LightningElement {

    currentFret;
    stringNumber;

    tuning = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'];

    currentFretAndString(event){
        let result = event.detail;
        this.currentFret = result[0];
        this.stringNumber = result[1];
    }
}