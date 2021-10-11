import { LightningElement, api, track } from 'lwc';

export default class Metronome extends LightningElement {

    constructor(){
        super();
        this.setTempo(160);
    }

    intervalObj;
    metroCounter = 1;
    bpm = 0;
    currentVolume = 0;
    counterMax = 4;
    active = false;
    muted = false;

    setTempo(bpm){
        clearInterval(this.intervalObj);

        this.intervalObj = setInterval(this.selfTick.bind(this), this.bpm2ms(bpm));

        this.bpm = bpm; 
    }

    selfTick(){

        if (this.active == true) {
            console.log('tick ' + this.metroCounter);

            this.metroCounter += 1;
            if (this.metroCounter > this.counterMax){
                this.metroCounter = 1;
            }

            this.currentVolume = this.template.querySelector('c-beat-pattern-ui').getTempList()[this.metroCounter - 1];
            if (this.muted) {
                this.currentVolume = 0;
            }
            let e = new CustomEvent('tick', {detail : this.currentVolume});
            this.dispatchEvent(e);
        }
    }

    counterMaxUpdate() {
        editBeats(event.target.value);
    }

    bpm2ms(bpm){
        // beats per minute (which is a frequency) converted to a period in milliseconds (T = 1 / f)
        return 1000.0 * 60.0/bpm;
    }

    faster(){
        this.bpm += 1;
        this.setTempo(this.bpm);
    }
    
    slower(){
        this.bpm -= 1;
        this.setTempo(this.bpm);
    }

    faster10(){
        this.bpm += 10;
        this.setTempo(this.bpm);
    }
    
    slower10(){
        this.bpm -= 10;
        this.setTempo(this.bpm);
    }

    moreBeats(){
        this.editBeats(this.counterMax + 1);
    }
    
    lessBeats(){
        this.editBeats(this.counterMax - 1);
    }

    editBeats(num) {
        this.counterMax = num;
        this.template.querySelector('c-beat-pattern-ui').setBeatsTotal(this.counterMax);
    }

    toggleMute() {
        this.muted = !this.muted;
    }

    start() {
        this.active = true;
        this.metroCounter = 0;
        this.setTempo(this.bpm);
    }

    stopMetronome() {
        this.active = false;
    }
    
}