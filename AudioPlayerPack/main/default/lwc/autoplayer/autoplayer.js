import { api, LightningElement } from 'lwc';

import { AudioPlayerNote } from 'c/commonUtils';
import { musicHelper } from 'c/commonUtils';
import SystemModstamp from '@salesforce/schema/Account.SystemModstamp';

export default class Autoplayer extends LightningElement {

    strumPattern = ["E", "c#", "Ab", "A"];
    strumPattern2 = ["E","e","d#","E"];

    tickCount = 0;
    chordCount = 0;

    isStrumming = true;

    setMode(){
        this.isStrumming = !this.isStrumming;

        this.tickCount = 0;
        this.chordCount = 0;
    }

    @api
    tickCallback(){
        console.log('tick in autoplayer');

        if(this.isStrumming){
            this.programmedStrumming();
        }else{
            this.playWholeKeyboard();
        }

        this.tickCount += 1;
    }

    playWholeKeyboard(){
        this.dispatchEvent(new CustomEvent('autoplay', 
        {detail: 
            new AudioPlayerNote(this.tickCount % 85, "A", 0)
        }));
    }

    programmedStrumming(){
        this.dispatchEvent(new CustomEvent('autoplay', 
        {detail: 
            new AudioPlayerNote(0, this.strumPattern[this.chordCount], 1)
        }));

        this.dispatchEvent(new CustomEvent('autoplay', 
        {detail: 
            new AudioPlayerNote(0, this.strumPattern2[this.chordCount], 3)
        }));
        
        
        if (this.tickCount >= this.strumPattern.length){
            this.tickCount = 0;
        }
        if (! this.tickCount % 3){
            this.chordCount += 1;
        }
        if(this.chordCount >= 4){
            this.chordCount = 0;
        }
    }
    /* This function plays a note when provided a note in string or integer formatting*/
    handleNote(note){
        /* Determines if the parameter is an integer, an array of integers (a chord), or a string and handles accordingly */
        if(note instanceof String){
            this.handleNoteHelper(note);
        } else if (Array.isArray(note)){
            for (i = 0; i < note.length; i++){
                this.handleNoteHelper(musicHelper.index2note2(note[i]));
            }
        } else if (note instanceof int){
            this.handleNoteHelper(musicHelper.index2note2(note));
        }
    }
    /* handles a note after it has been converted to string + octave formatting */
    handleNoteHelper(note){
        if (!(note.length === 3)){
            log("Attempted to pass an invalid note into the autostrummer. Notes should consist of a 2-char note and an octave if formatted as a string.");
            return;
        }
        noteStr = note.substr(0, 2);
        octave = parseInt(note.substr(2, 1));
        this.dispatchEvent(new CustomEvent('autoplay', 
        {detail: 
            new AudioPlayerNote(octave, noteStr, 0)
        }));
    }



}