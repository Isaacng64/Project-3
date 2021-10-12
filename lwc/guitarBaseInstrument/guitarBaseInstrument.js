import { LightningElement } from 'lwc';

export default class GuitarBaseInstrument extends LightningElement 
{
    currentFret;
    stringNumber;

    tuning = [1,2,3,4];

    currentFretAndString(event)
    {
        let result = event.detail;
        this.currentFret = result[0];
        this.stringNumber = result[1];
        console.log(result);
    }
    
}