import { LightningElement } from 'lwc';

/* 'Harmonics Explorer' I should have called it, meant to explore making an instrument sound out of component frequencies */

import { GuitarTonePlayer, TonePlayer } from '../audioPlayer/tonePlayer';

export default class FrequencyExplorer extends LightningElement {

    names = [];

    players = [];

    constructor(){
        super();

        
        this.players.push(new TonePlayer({name: "E", octave: 2}));
        this.names.push(Math.trunc(this.players[0].oscillator.frequency.value) + " Hz");

        let fundamental = this.players[0].oscillator.frequency.value;

        for(let i = 1; i < 10; i++){
            this.players.push(new TonePlayer({freq: (fundamental * (1 + i))}));

            this.names.push(Math.trunc(this.players[i].oscillator.frequency.value) + " Hz");
        }

        for(let i = 0; i < this.players.length; i++){
            this.players[i].start();
        }
    }

    handleChange(event){
        let amp = event.target.value;

        let dest = this.names.indexOf(event.target.label);

        this.players[dest].setVol(amp / 100.0);
    }

    pulse(){
        for(let i = 0; i < this.names.length; i++){
            this.players[i].pulse();
        }
    }

    a = new GuitarTonePlayer();
    guitar(){
        //this.a = new GuitarTonePlayer();
        this.a.play();
        console.log(this.a);
    }

}