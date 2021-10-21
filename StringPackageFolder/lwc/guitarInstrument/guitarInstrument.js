import { LightningElement, api} from 'lwc';

export default class GuitarInstrument extends LightningElement {

    currentFret;
    stringNumber;

    tuning = ['E1', 'A', 'D', 'G', 'B', 'E2'];

    currentFretAndString(event){
        let result = event.detail;
        this.currentFret = result[0];
        this.stringNumber = result[1];
    }
    playGuitar(event){
        let note = event.detail;
        console.log(note);
        this.template.querySelector('c-audio-player').playGuitar(note[0], note[1]);
    }
}