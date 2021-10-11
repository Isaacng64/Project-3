import { api, LightningElement } from 'lwc';
import { sharp2flat, offset2note } from './musicHelper';

import { buildLocalAudioPlayers } from './audioBuilder';
//import { arrayRemove } from './generalHelper';

export default class AudioPlayer extends LightningElement {

    clientNotesAuto = {}; // organized by instrument, octave with submaps of the note name to the audioplayer and beats remaining
    clientNotesManual = {}; // a second set of notes which you can use to play instruments with on top of auto strummer

    volume = 0.5;

    currentlyPlaying = [];

    constructor(){
        super();
        buildLocalAudioPlayers(this.clientNotesAuto, this.clientNotesManual);
    }

    @api
    playPiano(opts){

        let result = offset2note(opts["offset"], opts["octave"], opts["name"]); // only offset is strictly required, either or both of others can be null
        let octave = opts["octave"] ? Number(opts["octave"]) : '0'; // default to octave 0 if nothing specified.
        let name = opts["name"];

        if(result.name && result.octave){
            octave = result["octave"];
            name = result["name"];
        }

        if(name){
            name = sharp2flat(name);
            this.clientNotesAuto.piano[octave][name].player.currentTime = 0;
            this.clientNotesAuto.piano[octave][name].player.play();
        }
        else{
            throw "No name or offset given to play!";
        }

        if(opts["volume"] != null){
            this.clientNotesAuto.piano[octave][name].player.volume = opts["volume"]; 
        }else{
            this.clientNotesAuto.piano[octave][name].player.volume = this.volume;
        }

        if(opts["duration"]){
            console.log("Duration of notes not yet implemented! All notes play for one metronome-tick");
            //this.clientNotesAuto.piano[octave][name].remainingBeats = opts["duration"];
        }

        this.currentlyPlaying.push(this.clientNotesAuto.piano[octave][name]);
    }

    /*
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
            this.clientsideNotes[octave][name].pause();
        }

        arrayRemove(this.currentlyPlaying, this.clientsideNotes[octave][name]);
    }
    */


    @api
    tickCallback(){
        for(let i = 0; i < this.currentlyPlaying.length; i++){

            //if(this.currentlyPlaying[i].remainingBeats == 0){
                
            //}
            this.currentlyPlaying[i].player.pause();

            this.currentlyPlaying[i].remainingBeats -= 1;
        }
    }
    /*
        for(let i = 0; i < this.currentlyPlaying.length; i++){

            if(this.currentlyPlaying[i].remainingBeats == 0){
                this.currentlyPlaying[i].player.pause();
            }

            this.currentlyPlaying[i].remainingBeats -= 1;
        }

    }
    */

    changeVolume(event){
        this.volume = event.target.value;
    }

}