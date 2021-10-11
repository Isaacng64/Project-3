import { offset2note } from "./musicHelper";
import { sharp2flat } from "./musicHelper";

import pianoRes from '@salesforce/resourceUrl/Piano';


function buildLocalAudioPlayers(dictAuto, dictManual){

    dictAuto["piano"] = {};
    //dictAuto["guitar"] = {};
    //dictAuto["bass"] = {};
    dictManual["piano"] = {};
    //dictManual["guitar"] = {};
    //dictManual["bass"] = {};
    
    // build piano sounds
    for(let i = 0; i < 85; i++){

        let result = offset2note(i, null, null);

        let path = pianoRes + '/Piano' + '/' + String(result.octave) + '/' + sharp2flat(result.name) + '.mp3';

        if(! dictAuto.piano[result.octave]){
            dictAuto.piano[result.octave] = {};
            dictManual.piano[result.octave] = {};
        }
        dictAuto.piano[result.octave][result.name] = {remainingBeats: -1, player: new Audio(path)};
        dictManual.piano[result.octave][result.name] = {remainingBeats: -1, player: new Audio(path)};
    }

    console.log(dictAuto);
    console.log(dictManual);

}

export {buildLocalAudioPlayers}