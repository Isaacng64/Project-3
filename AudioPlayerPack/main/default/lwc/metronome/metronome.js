import { LightningElement, api, track } from 'lwc';

export default class Metronome extends LightningElement {

    constructor(){
        super();
        this.setTempo(160);
    }

    intervalObj;
    bpm = 0;
    currentVolume = 0;

    metroCounter = 1;
    counterMax = 4;
    @api
    counterMaxLocked = false;
    currentSubBeat = 0;
    
    active = false;
    muted = false;
    mutedString = 'Mute';

    setTempo(bpm){
        clearInterval(this.intervalObj);

        this.intervalObj = setInterval(this.subTick.bind(this), this.bpm2ms(bpm)/4);

        this.bpm = bpm; 
    }

    subTick() {
        if (this.active == true) {
            console.log('subtick ' + this.metroCounter);

            this.currentSubBeat++;
            if (this.currentSubBeat > 4){
                this.currentSubBeat = 1;
            }
            if (this.currentSubBeat == 1){
                this.selfTick();
            }

            let e = new CustomEvent('subtick');
            this.dispatchEvent(e);

        }
    }

    selfTick(){

        if (this.active == true) {
            console.log('tick ' + this.metroCounter);

            this.metroCounter += 1;
            if (this.metroCounter > this.counterMax){
                this.metroCounter = 1;
            }

            this.template.querySelector('c-beat-pattern-ui').highlightBeat(this.metroCounter - 1);
            this.currentVolume = this.template.querySelector('c-beat-pattern-ui').getTempList()[this.metroCounter - 1];
            if (this.muted) {
                this.currentVolume = 0;
            }
            let e = new CustomEvent('tick', {detail : this.currentVolume});
            this.dispatchEvent(e);
        }
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
        if (this.counterMax < 8) {
            this.editBeats(this.counterMax + 1);
        }
    }
    
    lessBeats(){
        if (this.counterMax > 0) {
            this.editBeats(this.counterMax - 1);
        }
    }

    editBeats(num) {
        if (!this.counterMaxLocked) {
            this.counterMax = num;
            this.template.querySelector('c-beat-pattern-ui').setBeatsTotal(this.counterMax);
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        this.mutedString = this.muted ? 'Unmute' : 'Mute';
    }

    start() {
        this.active = true;
        this.metroCounter = 0;
        this.currentSubBeat = 0;
        this.setTempo(this.bpm);
    }

    stopMetronome() {
        this.active = false;
    }
}