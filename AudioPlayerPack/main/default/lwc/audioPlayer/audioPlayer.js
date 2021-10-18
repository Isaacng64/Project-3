import { api, LightningElement } from "lwc";

import { buildLocalAudioPlayers, buildLocalGuitarPlayers, buildLocalBassPlayers } from "./audioBuilder";

import metronome from "@salesforce/resourceUrl/metronomesound";

import { AudioPlayerNote } from "c/commonUtils";

export * from "./tonePlayer";

export default class AudioPlayer extends LightningElement {
  /*
   * Organized by instrument, octave with submaps of the note name to the audioplayer and beats remaining.
   * A second set of notes which you can use to play instruments with on top of auto strummer is the clientNotesManual object.
   */
  clientNotesAuto = {};
  clientNotesManual = {}; /* just note that this isn't really used anywhere yet, not removing it though */
  metronomePlayer;

  volume = 0.5;

  currentlyPlaying = [];

  constructor() {
    super();
    buildLocalAudioPlayers(this.clientNotesAuto, this.clientNotesManual);
    buildLocalGuitarPlayers(this.clientNotesAuto, this.clientNotesManual);
    //buildLocalBassPlayers(this.clientNotesAuto, this.clientNotesManual);
    this.metronomePlayer = new Audio(metronome);

    console.log(this.clientNotesAuto);
    //console.log(this.clientNotesManual);
  }

  @api
  playPianoInteger(i, duration) {
    if(duration){
      this.playPiano(new AudioPlayerNote(i), duration);
    }else{
      this.playPiano(new AudioPlayerNote(i));
    }
  }

  @api
  playPiano(playerNote, duration) {
      if(playerNote.valid){

        let player_reference = this.clientNotesAuto["piano"][playerNote.octave][playerNote.name];
        player_reference.play(duration);
        player_reference.setVolume(this.volume);
        this.currentlyPlaying.push(player_reference);
      }else{
          throw "no valid note to play!";
      }
  }

  @api
  playGuitar(string_name, fret, duration){
    this.playString(string_name, fret, "guitar", duration);
  }

  @api
  playBass(string_name, fret, duration){
    this.playString(string_name, fret, "bass", duration);
  }

  playString(string_name, fret, instrument, duration){
    if(string_name != null && fret != null){
      let index = Number(fret);
      let string = String(string_name);

      let player_reference = this.clientNotesAuto[instrument][string][index];

      player_reference.play(duration);
      player_reference.setVolume(this.volume);

      this.currentlyPlaying.push(player_reference);
    }
    else{
      throw "no valid note to play!";
    }
  }

  @api
  tickCallback(tickVolume){

      this.metronomePlayer.currentTime = 0.0;
      this.metronomePlayer.volume = tickVolume;
      this.metronomePlayer.play();

      let newCurrentlyPlaying = [];
      this.currentlyPlaying.forEach((player) => {
        player.clockCallback();
        if(player.isStillPlaying()){
          newCurrentlyPlaying.push(player);
        }
      });
      this.currentlyPlaying = newCurrentlyPlaying;
  }


  handleSlider(event){
    //console.log(event.target.value / 100.0);
    this.volume = event.target.value / 100.0;
    for(let i = 0; i < this.currentlyPlaying.length; i++){
      this.currentlyPlaying[i].setVolume(this.volume);
  }
  }


  /* for testing */
  @api
  getCurPlaying(){
    return this.currentlyPlaying;
  }
}