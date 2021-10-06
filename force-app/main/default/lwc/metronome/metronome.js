import { LightningElement, api, track } from 'lwc';

export default class Metronome extends LightningElement {

    constructor(){
        super();

        this.setMetro(100); // bpm
    }

    intervalObj;
    @api
    setMetro(bpm){
        clearInterval(this.intervalObj);

        this.intervalObj = setInterval(this.selfTick.bind(this), this.bpm2ms(bpm));

        this.bpm = bpm; 
    }

    bpm2ms(bpm){
        // beats per minute (which is a frequency) converted to a period in milliseconds (T = 1 / f)
        return 1000.0 * 60.0/bpm;
    }

    faster(){
        this.bpm += 1;
        this.setMetro(this.bpm);
    }
    slower(){
        this.bpm -= 1;
        this.setMetro(this.bpm);
    }
    
    metroCounter = 1;
    bpm = 0;
    selfTick(){

        console.log('tick ' + this.metroCounter);

        this.metroCounter += 1;
        if (this.metroCounter > 4){
            this.metroCounter = 1;
        }

        let e = new CustomEvent('tick');
        this.dispatchEvent(e);
    }
    
}