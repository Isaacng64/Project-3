import { offset2note, sharp2flat } from "c/commonUtils";

import { PlayerWrapper } from "./playerWrapper";

import pianoRes from '@salesforce/resourceUrl/Piano';
import guitarRes from '@salesforce/resourceUrl/Guitar';
//import bassRes from '@salesforce/resourceUrl/Bass';

export {buildLocalAudioPlayers, buildLocalGuitarPlayers, buildLocalBassPlayers}


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

export {buildLocalAudioPlayers, buildLocalGuitarPlayers}

function buildLocalBassPlayers(dictAuto, dictManual){

    dictManual["bass"] = {};
    dictAuto["bass"] = {};

    ["E","A","D","G"].forEach((note) => {

        if(! dictAuto.bass[note]){
            dictAuto.bass[note] = [];
            dictManual.bass[note] = [];
        }

        /* number of frets! */
        for(let i = 0; i < 23; i++){



            /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
            let path = bassRes + "/E-Standard" + "/" + note + "/" + String(i) + ".mp3";
            /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/


            dictAuto.bass[note][i] = new PlayerWrapper(new Audio(path));
            dictManual.bass[note] = new PlayerWrapper(new Audio(path));
        }

    });

}
