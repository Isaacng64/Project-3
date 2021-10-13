import { offset2note, sharp2flat } from "c/commonUtils";

import pianoRes from '@salesforce/resourceUrl/Piano';


export {buildLocalAudioPlayers}


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

}


function buildLocalAudioPlayers(dictAuto, dictManual){

    dictAuto["piano"] = {};
    dictAuto["guitar"] = {};
    //dictAuto["bass"] = {};
    dictManual["piano"] = {};
    dictManual["guitar"] = {};
    //dictManual["bass"] = {};
    
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

    console.log(dictAuto);
    console.log(dictManual);
}
