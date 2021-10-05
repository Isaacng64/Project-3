import { api, LightningElement } from 'lwc';
//import song from '@salesforce/resourceUrl/oneminute';
//import song2 from '@salesforce/resourceUrl/whensun';

import dosSongs from '@salesforce/resourceUrl/dosSongs';

export default class AudioPlayer extends LightningElement {

        //a = new Audio(dosSongs + '/audioSmall/s1.mp3');
        //b = new Audio(dosSongs + '/audioSmall/s2.mp3');

    play(){
        let a = new Audio(dosSongs + '/audioSmall/s1.mp3');
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

    metroCounter = 1;
    bpm = 0;
    metroCallback(){

        console.log('tick ' + this.metroCounter);

        this.metroCounter += 1;
        if (this.metroCounter > 4){
            this.metroCounter = 1;
        }

    }

    faster(){
        this.bpm += 1;
        this.setMetro(this.bpm);
    }
    slower(){
        this.bpm -= 1;
        this.setMetro(this.bpm);
    }
    
    intervalObj;
    @api
    setMetro(bpm){

        clearInterval(this.intervalObj);

        this.intervalObj = setInterval(this.metroCallback.bind(this), 1000.0 * 60.0/bpm);

        this.bpm = bpm; 

    }

    constructor(){
        super();

        this.setMetro(100); // bpm
    }


    topnum;
    botnum;
    botchange(event){
        this.botnum = event.target.value;
    }
    topchange(event){
        this.topnum = event.target.value;
    }

}