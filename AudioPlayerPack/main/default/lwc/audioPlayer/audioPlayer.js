import { api, LightningElement } from "lwc";

import { buildLocalAudioPlayers, buildLocalGuitarPlayers } from "./audioBuilder";

import metronome from "@salesforce/resourceUrl/metronomesound";

import { AudioPlayerNote } from "c/commonUtils";

export * from "./tonePlayer";

export default class AudioPlayer extends LightningElement {
  /*
   * Organized by instrument, octave with submaps of the note name to the audioplayer and beats remaining.
   * A second set of notes which you can use to play instruments with on top of auto strummer is the clientNotesManual object.
   */
  clientNotesAuto = {};
  clientNotesManual = {};
  metronomePlayer;

  volume = 0.5;

  currentlyPlaying = [];
  autoPlaying = [];

  constructor() {
    super();
    buildLocalAudioPlayers(this.clientNotesAuto, this.clientNotesManual);
    buildLocalGuitarPlayers(this.clientNotesAuto, this.clientNotesManual);
    this.metronomePlayer = new Audio(metronome);

    console.log(this.clientNotesAuto);
    console.log(this.clientNotesManual);
  }

  /* Thinking ahead you may optionally take params for duration and volume IN HERE separate from note construction which is just THE NOTE */
  @api
  playPianoInteger(i) {
    this.playPiano(new AudioPlayerNote(i));
  }

  @api
  playPiano(playerNote) {
      if(playerNote.valid){
          this.clientNotesAuto["piano"][playerNote.octave][playerNote.name].play(); // can specify duration in player.play() function!
          this.clientNotesAuto["piano"][playerNote.octave][playerNote.name].setVolume(this.volume);
      }else{
          throw "no valid note to play!";
      }

      this.currentlyPlaying.push(this.clientNotesAuto["piano"][playerNote.octave][playerNote.name]);
  }

  @api
  tickCallback(tickVolume, autoNotes){

      this.metronomePlayer.currentTime = 0.0;
      this.metronomePlayer.volume = tickVolume;
      this.metronomePlayer.play();


      for(let i = 0; i < this.autoPlaying.length; i++){
          this.autoPlaying[i].stop();
      }
      this.autoPlaying = [];

      for(let i = 0; i < autoNotes.length; i++){
          this.playPiano(autoNotes[i]);
          this.autoPlaying.push(this.clientNotesAuto["piano"][autoNotes[i].octave][autoNotes[i].name]);
      }
  }

  changeVolume(event){
      this.volume = event.target.value;
      for(let i = 0; i < this.currentlyPlaying.length; i++){
          this.currentlyPlaying[i].setVolume(this.volume);
      }
  }
}