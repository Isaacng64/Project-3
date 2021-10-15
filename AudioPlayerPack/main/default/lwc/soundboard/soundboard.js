import { LightningElement } from 'lwc';

export default class Soundboard extends LightningElement {

    nextNotes = [];

    tickHandle(event){
        this.nextNotes = [];

        let tickVolume = event.detail;

        this.template.querySelector("c-autoplayer").tickCallback();

        console.log(this.nextNotes);

        this.template.querySelector("c-audio-player").tickCallback(tickVolume, this.nextNotes);


        
    }

    autoPlayHandle(event){
        this.nextNotes.push(event.detail);
    }

}