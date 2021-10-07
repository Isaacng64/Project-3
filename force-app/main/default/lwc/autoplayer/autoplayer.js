import { api, LightningElement } from 'lwc';
import { offset2note } from '../audioPlayer/musicHelper';

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
        if(this.tickCount < 85){
            let key = this.tickCount / 12.0;
            console.log(key);
            key = Math.trunc(key);
            console.log(key);
            let noteIndex = this.tickCount % 12;
    
    
            this.dispatchEvent(new CustomEvent('autoplay', 
            {detail: 
                {'octave': key,
                name: offset2note(noteIndex),
                clear: true} // default for clear is false, just explicitly demonstrating here
            }));
        }
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