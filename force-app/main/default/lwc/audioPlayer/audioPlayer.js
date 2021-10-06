import { api, LightningElement } from 'lwc';
//import song from '@salesforce/resourceUrl/oneminute';
//import song2 from '@salesforce/resourceUrl/whensun';

import dosSongs from '@salesforce/resourceUrl/dosSongs';

import pianoRes from '@salesforce/resourceUrl/Piano';

export default class AudioPlayer extends LightningElement {

    pianoPath;
    constructor(){
        super();
        this.pianoPath = pianoRes + '/Piano';
    }
    

    volume;
    
    changeVolume(event){
        this.volume = event.target.value;
    }

    //playHandle(){
    //    this.play({volume: this.volume, name: "s2"});
    //}


    currentlyPlaying =[];
    @api
    play(opts){

        if(opts["key"]){
            var key = String(opts["key"]);
        }else{
            var key = '7';
        }

        if(opts["name"]){
            let path = this.pianoPath + '/' + key + '/' + opts["name"] + '.mp3';
            console.log(path);
            var a = new Audio(path);
        }else{
            var a = new Audio(this.pianoPath + '/' + key + '/' + "A" + '.mp3'); // default song to play
        }

        if(opts["volume"]){
            a.volume = opts["volume"];
        }else{
            a.volume = 0.5;
        }
        
        if(opts["clear"]){
            for(let i = 0; i < this.currentlyPlaying.length; i++){
                //this.currentlyPlaying[i].pause();
                this.currentlyPlaying[i].volume /= 5.0;
            }
            this.currentlyPlaying = [];
        }

        this.currentlyPlaying.push(a);

        a.play();
    }

    playPiano(){
        let path = this.pianoPath + '/2/C#.mp3';

        //let url = encodeURIComponent(path);

        //let url = path.replace('#', '%23');

        console.log(path);
        
        let a = new Audio(path);

        a.play();
    }

    /*   
    playLink(){
        let a = new Audio('https://srv3.onlymp3.net/download?file=3a8ae414bc7e7955109768889a4f1f9d251003003');
        a.play();
    }
    */

}