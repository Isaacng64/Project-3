import { api, LightningElement } from 'lwc';
import { sharp2flat, offset2note } from './musicHelper';

import { buildLocalAudioPlayers } from './audioBuilder';

import metronome from '@salesforce/resourceUrl/metronomesound';

import { InstrumentTonePlayer } from './tonePlayer';

export default class AudioPlayer extends LightningElement {

    testclass = new InstrumentTonePlayer({name: "A", octave: 0});

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

        //this.testclass.play();
    }

    @api
    playPianoInteger(i){
        this.playPiano({offset: i});
    }

    @api
    playPiano(opts){
        this.play(opts, "piano");
    }

    play(opts, instrument){

        /*
         * Only offset is strictly required, either or both of others can be null
         * Default to octave 0 if nothing specified since not required
         */
        let result = offset2note(opts["offset"], opts["octave"], opts["name"]);
        let octave = opts["octave"] ? Number(opts["octave"]) : '0';
        let name = opts["name"];

        if(result.name && result.octave){
            octave = result["octave"];
            name = result["name"];
        }

        if(name){
            name = sharp2flat(name);
            this.clientNotesAuto[instrument][octave][name].player.currentTime = 0;
            this.clientNotesAuto[instrument][octave][name].player.play();
        }
        else{
            throw "No name or offset given to play!";
        }

        if(opts["volume"] != null){
            this.clientNotesAuto[instrument][octave][name].player.volume = opts["volume"]; 
        }else{
            this.clientNotesAuto[instrument][octave][name].player.volume = this.volume;
        }

        if(opts["duration"]){
            console.log("Duration of notes not yet implemented! All notes play for one metronome-tick");
            //this.clientNotesAuto.piano[octave][name].remainingBeats = opts["duration"];
        }

        this.currentlyPlaying.push(this.clientNotesAuto[instrument][octave][name]);
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

    @api
    tickCallback(tickVolume){
        for(let i = 0; i < this.currentlyPlaying.length; i++){

            //if(this.currentlyPlaying[i].remainingBeats == 0){
                
            //}
            this.currentlyPlaying[i].player.pause();

            this.currentlyPlaying[i].remainingBeats -= 1;
        }

        this.metronomePlayer.currentTime = 0.0;
        this.metronomePlayer.volume = tickVolume;
        this.metronomePlayer.play();
    }

    changeVolume(event){
        this.volume = event.target.value;
    }

}