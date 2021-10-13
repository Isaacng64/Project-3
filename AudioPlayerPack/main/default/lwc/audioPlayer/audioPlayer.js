import { api, LightningElement } from 'lwc';

import { buildLocalAudioPlayers } from './audioBuilder';

import metronome from '@salesforce/resourceUrl/metronomesound';

import { AudioPlayerNote } from 'c/commonUtils';

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

            this.currentlyPlaying[i].stop();

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
            this.clientNotesAuto[instrument][playerNote.octave][playerNote.name].play(); // can specify duration in player.play() function!
        }else{
            throw "no valid note to play!";
        }


        /*
        if(opts["volume"] != null){
            this.clientNotesAuto[instrument][octave][name].player.volume = opts["volume"];
        }else{
            this.clientNotesAuto[instrument][octave][name].player.volume = this.volume;
        }*/

        this.currentlyPlaying.push(this.clientNotesAuto[instrument][playerNote.octave][playerNote.name]);
    }

    changeVolume(event){
        this.volume = event.target.value;
    }

}


