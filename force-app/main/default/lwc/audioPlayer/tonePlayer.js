import { note2freq } from "./musicHelper";

export class TonePlayer{

    context;

    envelope;

    oscillator;

    constructor({name, octave, vol}){

        this.context = new AudioContext();

        this.envelope = this.context.createGain();
        this.envelope.gain.value = 0.03 * vol;



        this.oscillator = this.context.createOscillator(); //new OscillatorNode();
        this.oscillator.frequency.value = note2freq({name, octave});
        console.log(note2freq({name, octave}) + " Hz");
        this.oscillator.type = 'sine';

        this.oscillator.connect(this.envelope);
        this.envelope.connect(this.context.destination);

        //this.oscillator.start();

    }
    start(){
        this.oscillator.start();
    }
    stop(){
        this.oscillator.stop();
    }
}

export class InstrumentTonePlayer{
    tonePlayers = [];
    constructor({name, octave}){
        this.tonePlayers.push(new TonePlayer({name, octave : octave + 2, vol: 0.10}));
        this.tonePlayers.push(new TonePlayer({name, octave : octave + 3, vol: 1.0}));
        this.tonePlayers.push(new TonePlayer({name, octave : octave + 4, vol: 0.3}));
        this.tonePlayers.push(new TonePlayer({name, octave : octave + 5, vol: 0.08}));
        //this.tonePlayers.push(new TonePlayer({name: "E", octave: 6, vol: 0.3}));
        //this.tonePlayers.push(new TonePlayer({name: "E", octave: 7, vol: 0.08}));
        //this.tonePlayers.push(new TonePlayer({name: "E", octave: 8, vol: 0.1}));
        //this.tonePlayers.push(new TonePlayer({name: "E", octave: 9, vol: 0.1}));
        //this.tonePlayers.push(new TonePlayer({name: "E", octave: 9, vol: 0.1}));
    }

    play(){
        for (let i = 1; i < 10; i++){
            this.tonePlayers[i-1].start();
        }
    }
    stop(){
        for (let i = 1; i < 10; i++){
            this.tonePlayers[i-1].stop();
        } 
    }
}