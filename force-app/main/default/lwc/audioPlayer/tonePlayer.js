import { note2freq } from "./musicHelper";

import { guitarDistribution } from "./instrumentSynthBuilder";

export class TonePlayer{

    context;

    envelope;

    oscillator;

    volume = 0;

    constructor({name, octave, freq}){

        this.context = new AudioContext();

        this.oscillator = this.context.createOscillator(); //new OscillatorNode();
        if(freq){
            this.oscillator.frequency.value = freq;
        }
        else{
            this.oscillator.frequency.value = note2freq({name, octave});
            console.log(note2freq({name, octave}) + " Hz");
        }

        this.oscillator.type = 'sine';
    }

    start(){
        this.oscillator.start();
    }
    stop(){
        this.oscillator.stop();
    }
    setVol(vol){
        this.volume = vol;
        this.envelope = this.context.createGain();
        this.envelope.gain.value = 0.1 * this.volume;
        this.oscillator.connect(this.envelope);
        this.envelope.connect(this.context.destination);
    }
    pulse(dur){
        this.setVol(this.volume);

        this.envelope.gain.exponentialRampToValueAtTime(0.00001, this.context.currentTime + dur);
        this.envelope.gain.clear
        //console.log("pulse " + this.envelope.gain.value + " for " + dur + " seconds");
        try{
            this.start();
        }
        catch(e){

        }
    }
}


export class GuitarTonePlayer{
    tonePlayers = [];
    constructor(){
        for(let i = 0; i < 10; i++){

            this.tonePlayers.push(new TonePlayer({freq: ((1+i)*82)}));
            this.tonePlayers[i].setVol(guitarDistribution(i));
            
        }
    }

    play(){
        for (let i = 0; i < this.tonePlayers.length; i++){
            this.tonePlayers[i].pulse(5);
            //this.tonePlayers[i].start();
        }
        //console.log("play");
    }
    stop(){
        for (let i = 0; i < this.tonePlayers.length; i++){
            this.tonePlayers[i].stop();
        }
    }
}