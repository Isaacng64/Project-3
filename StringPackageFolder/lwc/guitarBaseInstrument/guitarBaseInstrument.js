import { LightningElement, api } from 'lwc';

export default class GuitarBaseInstrument extends LightningElement 
{
    currentFret;
    stringNumber;

    tuning = ['E2', 'A2', 'D3', 'G3'];

    currentFretAndString(event)
    {
        let result = event.detail;
        this.currentFret = result[0];
        this.stringNumber = result[1];
        console.log(result);
    }
    
}