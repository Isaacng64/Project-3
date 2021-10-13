import { LightningElement, api} from 'lwc';

export default class GuitarInstrument extends LightningElement {

    currentFret;
    stringNumber;

    tuning = [1, 2, 3, 4, 5, 6];
    //1 is high E & 6 is low E

    currentFretAndString(event){
        let result = event.detail;
        this.currentFret = result[0];
        this.stringNumber = result[1];
        console.log(result);
        //area to display strumming configuration
        //additional strumming component with onhover 
    }
}