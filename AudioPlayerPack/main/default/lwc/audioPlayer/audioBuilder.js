import { offset2note, sharp2flat } from "c/commonUtils";

import pianoRes from '@salesforce/resourceUrl/Piano';
import guitarRes from '@salesforce/resourceUrl/Guitar'

export {buildLocalAudioPlayers, buildLocalGuitarPlayers}

class PlayerWrapper{

    player; // either AudioPlayer or TonePlayer! polymorphism ? 8D
    remainingBeats = -1;

    constructor(player){
        this.player = player;
    }

    play(beats){

        if(beats){
            this.remainingBeats = dur;
        }

        this.player.currentTime = 0;

        try{
            this.player.play();
        }catch(e){
            console.log("could not start player");
        }
        
    }

    stop(){

        this.player.pause();

    }

    tickRemainingDuration(){
        if(this.remainingBeats == 0){
            this.stop();
        }
        else{
            this.remainingBeats -= 1;
        }
    }

    setVolume(vol){
        this.player.volume = vol;
    }

}


function buildLocalAudioPlayers(dictAuto, dictManual){

    dictAuto["piano"] = {};
    dictManual["piano"] = {};
    
    /* Build Piano sounds */
    for(let i = 0; i < 85; i++){

        let result = offset2note(i, null, null);

        let path = pianoRes + '/Piano' + '/' + String(result.octave) + '/' + sharp2flat(result.name) + '.mp3';

        if(! dictAuto.piano[result.octave]){
            dictAuto.piano[result.octave] = {};
            dictManual.piano[result.octave] = {};
        }

        dictAuto.piano[result.octave][result.name] = new PlayerWrapper(new Audio(path));
        dictManual.piano[result.octave][result.name] = new PlayerWrapper(new Audio(path));

    }
}

function buildLocalGuitarPlayers(dictAuto, dictManual){

    dictAuto["guitar"] = {};
    dictManual["guitar"] = {};
    //dictManual["bass"] = {};
    //dictAuto["bass"] = {};

    ["E1","A","D","G","B","E2"].forEach((note) => {

        if(! dictAuto.guitar[note]){
            dictAuto.guitar[note] = [];
            dictManual.guitar[note] = [];
        }

        for(let i = 0; i < 23; i++){
            let path = guitarRes + "/E-Standard" + "/" + note + "/" + String(i) + ".mp3";
            dictAuto.guitar[note][i] = new PlayerWrapper(new Audio(path));
            dictManual.guitar[note] = new PlayerWrapper(new Audio(path));
        }

    });

}