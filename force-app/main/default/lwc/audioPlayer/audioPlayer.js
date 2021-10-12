import { api, LightningElement } from 'lwc';

import { buildLocalAudioPlayers } from './audioBuilder';

import metronome from '@salesforce/resourceUrl/metronomesound';

import { AudioPlayerNote } from './audioPlayerNote';

export default class AudioPlayer extends LightningElement {

    /* 
     * Organized by instrument, octave with submaps of the note name to the audioplayer and beats remaining.
     * A second set of notes which you can use to play instruments with on top of auto strummer is the clientNotesManual object.
     */
    clientNotesAuto = {};
    clientNotesManual = {};
    metronomePlayer;

    volume = 0.5;

    currentlyPlaying = [];

    constructor(){
        super();
        buildLocalAudioPlayers(this.clientNotesAuto, this.clientNotesManual);
        this.metronomePlayer = new Audio(metronome);
    }



    /* Thinking ahead you may optionally take params for duration and volume IN HERE separate from note construction which is just THE NOTE */
    @api
    playPianoInteger(i){ 
        this.playPiano(new AudioPlayerNote(i));
    }

    @api
    playPiano(playerNote){
        this.play(playerNote, "piano");
    }   

    @api
    tickCallback(tickVolume){
        for(let i = 0; i < this.currentlyPlaying.length; i++){

            this.currentlyPlaying[i].player.pause();

        }

        this.metronomePlayer.currentTime = 0.0;
        this.metronomePlayer.volume = tickVolume;
        this.metronomePlayer.play();
    }


    play(playerNote, instrument){

        /*
         * Only offset is strictly required, either or both of others can be null
         * Default to octave 0 if nothing specified since not required
         */

        if(playerNote.valid){
            this.clientNotesAuto[instrument][playerNote.octave][playerNote.name].player.currentTime = 0;
            this.clientNotesAuto[instrument][playerNote.octave][playerNote.name].player.play();
        }else{
            throw "no valid note to play!";
        }


        /*
        if(opts["volume"] != null){
            this.clientNotesAuto[instrument][octave][name].player.volume = opts["volume"]; 
        }else{
            this.clientNotesAuto[instrument][octave][name].player.volume = this.volume;
        }

        if(opts["duration"]){
            console.log("Duration of notes not yet implemented! All notes play for one metronome-tick");
            //this.clientNotesAuto.piano[octave][name].remainingBeats = opts["duration"];
        }*/

        this.currentlyPlaying.push(this.clientNotesAuto[instrument][playerNote.octave][playerNote.name]);
    }

    changeVolume(event){
        this.volume = event.target.value;
    }

}

class PlayerWrapper{
    
    player;
    remainingDuration = -1;

    constructor(){

    }

    play(){
        this.player.currentTime = 0;
        this.player.play();
    }

    stop(){


    }

}


    /* Cancel play cancels notes in the MANUAL PLAY dictionary whereas the ones in the auto-play dict will be played for a duration (atm a fixed duration of 1 metronome tick)
    @api
    cancelPlay(opts){
        let result = offset2note(opts["offset"], opts["octave"], opts["name"]); // only offset is strictly required, either or both of others can be null
        let octave = opts["octave"] ? Number(opts["octave"]) : '0'; // default to octave 0 if nothing specified.
        let name = opts["name"];

        if(result.name){
            octave = result["octave"];
            name = result["name"];
        }

        if(name){
            name = sharp2flat(name);
            this.clientNotesManual[octave][name].pause();
        }
    }
    */