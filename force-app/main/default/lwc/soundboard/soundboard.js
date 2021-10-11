import { LightningElement } from 'lwc';

export default class Soundboard extends LightningElement {

    tickHandle(){
        this.template.querySelector("c-audio-player").tickCallback();    
        this.template.querySelector("c-autoplayer").tickCallback();
    }

    autoPlayHandle(event){
        let note = event.detail;
        console.log(note);
        this.template.querySelector("c-audio-player").playPiano(note); // note is object
    }

}