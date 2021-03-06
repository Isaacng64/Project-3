export class PlayerWrapper{

    player;
    remainingBeats = 25; // arbitrarily large number means full duration of the note positively

    constructor(player){
        this.player = player;
    }

    stop(){
        try{
            this.player.pause();
        }catch(e){
            console.log("could not pause player");
        }
    }

    play(beats){

        if(beats){
            this.remainingBeats = beats;
        }else{
            this.remainingBeats = 25;
        }

        this.player.currentTime = 0;

        try{
            this.player.play();
        }catch(e){
            console.log("could not start player");
        }
    }

    clockCallback(){
        this.remainingBeats -= 1;

        if(this.remainingBeats < 0){
            this.stop();   
        }
        
        console.log("clocked! " + this.remainingBeats);
    }

    setVolume(vol){
        this.player.volume = vol;
    }

    isStillPlaying(){
        return this.remainingBeats >= 0;
    }
}