import { api, LightningElement } from 'lwc';
//import song from '@salesforce/resourceUrl/oneminute';
//import song2 from '@salesforce/resourceUrl/whensun';

import dosSongs from '@salesforce/resourceUrl/dosSongs';

export default class AudioPlayer extends LightningElement {

    volume;
    changeVolume(event){
        this.volume = event.target.value;
    }

    playHandle(){
        this.play({volume: this.volume, name: "s1"});
    }

    play(opts){

        if(opts["name"]){
            var a = new Audio(dosSongs + '/audioSmall/' + opts["name"] + '.mp3');
        }else{
            var a = new Audio(dosSongs + '/audioSmall/s1.mp3'); // default song to play
        }

        if(opts["volume"]){
            a.volume = opts["volume"];
        }else{
            a.volume = 0.5;
        }
        
        a.play();
    }

    /*   
    playLink(){
        let a = new Audio('https://srv3.onlymp3.net/download?file=3a8ae414bc7e7955109768889a4f1f9d251003003');
        a.play();
    }
    */

}