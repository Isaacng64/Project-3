import { LightningElement } from "lwc";

/* 'Harmonics Explorer' I should have called it, meant to explore making an instrument sound out of component frequencies */

import { GuitarTonePlayer, TonePlayer } from "c/audioPlayer";

export default class FrequencyExplorer extends LightningElement {
  names = [];

  players = [];

  constructor() {
    super();
    this.populatePlayers();
  }

  populatePlayers() {
    this.names = [];
    this.players = [];
    let tempTone = new TonePlayer({ name: "E", octave: 2 });
    //this.players.push(tempTone);
    let tempFreq = tempTone.oscillator.frequency.value;
    tempFreq *= Math.pow(2, this.noteIndex / 12);
    this.players.push(new TonePlayer({ freq: tempFreq }));

    this.names.push(
      Math.trunc(this.players[0].oscillator.frequency.value) + " Hz"
    );

    let fundamental = this.players[0].oscillator.frequency.value;

    for (let i = 1; i < 10; i++) {
      this.players.push(new TonePlayer({ freq: fundamental * (1 + i) }));

      this.names.push(
        Math.trunc(this.players[i].oscillator.frequency.value) + " Hz"
      );
    }

    for (let i = 0; i < this.players.length; i++) {
      this.players[i].start();
    }
  }

  handleChange(event) {
    let amp = event.target.value;

    let dest = this.names.indexOf(event.target.label);

    this.players[dest].setVol(amp / 100.0);
  }

  pulse() {
    for (let i = 0; i < this.names.length; i++) {
      this.players[i].pulse();
    }
  }

  a = new GuitarTonePlayer();
  noteIndex = 0;
  guitar() {
    //this.a = new GuitarTonePlayer();

    //this.noteIndex += 1;
    this.a = new GuitarTonePlayer(this.noteIndex);
    this.a.play();
    console.log(this.a);
  }

  stopGuitar() {
    this.a.stop();
  }

  stopAll() {
    for (let i = 0; i < this.names.length; i++) {
      this.players[i].stop();
      //this.players[i].setVol(0);
    }
    this.stopGuitar();
  }

  updateNoteIndex() {
    this.noteIndex = event.target.value;
    this.populatePlayers();
  }
}
