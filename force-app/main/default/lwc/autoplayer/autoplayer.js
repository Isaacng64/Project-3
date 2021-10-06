import { api, LightningElement } from 'lwc';

export default class Autoplayer extends LightningElement {

    strumPattern = ["E", "Db", "Ab", "A"];
    strumPattern2 = ["E","E","Eb","E"];


    tickCount = 0;
    chordCount = 0;

    @api
    tickCallback(){
        console.log('tick in autoplayer');

        this.dispatchEvent(new CustomEvent('autoplay', {detail: 
            {key: 1, name: this.strumPattern[this.chordCount], clear: true}
        }
            ));
        this.dispatchEvent(new CustomEvent('autoplay', {detail: {
            key: 3, name: this.strumPattern2[this.chordCount]}}));
        
        this.tickCount += 1;
        
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