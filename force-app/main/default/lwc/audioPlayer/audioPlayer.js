import { api, LightningElement } from 'lwc';
//import song from '@salesforce/resourceUrl/oneminute';
//import song2 from '@salesforce/resourceUrl/whensun';

import dosSongs from '@salesforce/resourceUrl/dosSongs';

export default class AudioPlayer extends LightningElement {

        //a = new Audio(dosSongs + '/audioSmall/s1.mp3');
        //b = new Audio(dosSongs + '/audioSmall/s2.mp3');

    volume;
    changeVolume(event){
        this.volume = event.target.value;
        console.log(this.volume);
    }

    playHandle(){
        this.play(this.volume);
    }

    play(volume){
        let a = new Audio(dosSongs + '/audioSmall/s1.mp3');
        a.volume = volume;
        a.play();

            //console.log('playing ' + dosSongs + '/audioSmall/s1.mp3');
            //this.a.play();
            //this.b.play();
    }
         
    /*
    dec(){
        this.a.volume -= 0.1;
        this.b.volume -= 0.1;
    }
         
    playLink(){
        let a = new Audio('https://srv3.onlymp3.net/download?file=3a8ae414bc7e7955109768889a4f1f9d251003003');
        a.play();
    }
    */

}