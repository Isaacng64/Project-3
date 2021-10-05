import { LightningElement, api } from 'lwc';

export default class Metronome extends LightningElement {

    constructor(){
        super();

        this.setMetro(100); // bpm
    }

    intervalObj;
    @api
    setMetro(bpm){

        clearInterval(this.intervalObj);

        this.intervalObj = setInterval(this.metroCallback.bind(this), 1000.0 * 60.0/bpm);

        this.bpm = bpm; 
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
    metroCallback(){

        console.log('tick ' + this.metroCounter);

        this.metroCounter += 1;
        if (this.metroCounter > 4){
            this.metroCounter = 1;
        }
    }

    topnum;
    botnum;
    botchange(event){
        this.botnum = event.target.value;
    }
    topchange(event){
        this.topnum = event.target.value;
    }
}