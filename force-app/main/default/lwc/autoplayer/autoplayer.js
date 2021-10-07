import { api, LightningElement } from 'lwc';

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
            {octave: 0,
            name: "A",
            offset: this.tickCount % 85,
            //volume : default is 0.5 (50%)
            clear: true} // default for clear is false, just explicitly demonstrating here
        }));
    }

    programmedStrumming(){
        this.dispatchEvent(new CustomEvent('autoplay', 
        {detail: 
            {octave: 1, 
            name: this.strumPattern[this.chordCount], 
            clear: true} // with clear true, it clears all notes which were already playing instead of leaving them resonating in the background
        }));

        this.dispatchEvent(new CustomEvent('autoplay', 
        {detail: 
            {octave: 3, 
            name: this.strumPattern2[this.chordCount],
            clear: false} // default for clear is false, just explicitly demonstrating here
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