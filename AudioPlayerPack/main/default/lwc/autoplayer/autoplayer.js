import { api, LightningElement } from 'lwc';

import { AudioPlayerNote } from 'c/commonUtils';

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
            new AudioPlayerNote(0, this.strumPattern[this.chordCount], 1) // with clear true, it clears all notes which were already playing instead of leaving them resonating in the background
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

}