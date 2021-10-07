import { api, LightningElement } from 'lwc';
import { sharp2flat, offset2note } from './musicHelper';
import pianoRes from '@salesforce/resourceUrl/Piano';

export default class AudioPlayer extends LightningElement {

    pianoPath;
    volume = 0.5;
    currentlyPlaying =[];

    constructor(){
        super();
        this.pianoPath = pianoRes + '/Piano';
    }
    
    changeVolume(event){
        this.volume = event.target.value;
    }


    @api
    play(opts){

        if(opts["offset"]){
            let result = offset2note(opts["octave"], opts["name"] ,opts["offset"]); // only offset is strictly required
            var octaveOffset = result[0];
            var offsetName = result[1];
        }

        if(opts["octave"]){
            var octave = Number(opts["octave"]);
        }else{
            var octave = 0;
        }

        octave += octaveOffset ? octaveOffset : 0;

        if(offsetName){
            var path = this.makeFilePath("Piano", octave, offsetName);    
        }
        else if(opts["name"]){
            var path = this.makeFilePath("Piano", octave, opts["name"]);
        }
        else{
            throw "No name or offset given to play!";
        }
        console.log(path);
        let a = new Audio(path);

        if(opts["volume"]){
            a.volume = opts["volume"];
        }else{
            a.volume = this.volume;
        }
        
        if(opts["clear"]){
            // might be deprecated if audio players are preloaded instead of always newly instantiated
            for(let i = 0; i < this.currentlyPlaying.length; i++){
                //this.currentlyPlaying[i].pause();
                this.currentlyPlaying[i].volume /= 6.0;
            }
            this.currentlyPlaying = [];
        }

        this.currentlyPlaying.push(a);

        a.play();
    }

    makeFilePath(instrument, octave, name){
        if(instrument.toLowerCase() == "piano"){
            let path = this.pianoPath + '/' + String(octave) + '/' + sharp2flat(name) + '.mp3';
            return path;
        }
        else{
            throw "Instrument either not specified or not yet implemented!";
        }
    }

}
