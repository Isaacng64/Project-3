import { LightningElement, track, api, wire } from 'lwc';
import SaveMusicNote from '@salesforce/apex/PianoController.SaveMusicNote';

export default class songbuildermeasure extends LightningElement {
  @api measureId;
  @api octave;
  @api songId;
  @api loadedNotes;
  notesInMeasure = [];
  
  connectedCallback(){
    let loadResult = JSON.stringify(this.loadedNotes);
    let addResult = loadResult + 'a';
    let loadedList = addResult.substring(1, loadResult.length-1).split(',');

    for (let i = 0; i < loadedList.length; i++){
      if (!(loadedList[i] == '')) {
        this.notesInMeasure.push(loadedList[i].replaceAll('"', ''));
      }
    }
  }

  renderedCallback() {
    let tds = this.template.querySelectorAll('td');
    var self = this;
    let octaveOffset = (self.octave - 3) * 12;
    let picked = [];
    for (let j = 0; j < this.notesInMeasure.length; j++){
      let toPick = ((this.notesInMeasure[j] + '').substring(0,2) - octaveOffset).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '-' + (this.notesInMeasure[j] + '').substring(2);
      picked.push(toPick);
    }
    for (let i = 0; i < tds.length; i++) {
      tds[i].addEventListener('click', function(){
        let octaveOffset = (self.octave - 3) * 12;
        if (this.style.background == 'green'){
          let toRemove = self.notesInMeasure.indexOf((this.classList[0].split('-')[0] - 0 + octaveOffset).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + this.classList[0].split('-')[1]);
          if (toRemove != -1) {
            self.notesInMeasure.splice(toRemove, 1);
          }
          this.style.background = 'white';
        } else {
          self.notesInMeasure.push((this.classList[0].split('-')[0] - 0 + octaveOffset).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + this.classList[0].split('-')[1]);
          this.style.background = 'green';
        }
      }, false);
      if (picked.includes(tds[i].classList[0])) {
        tds[i].style.background = 'green';
      }
    }
  }

  @api getNotesInMeasure(){
    let notes = [];
    for (let i = 0; i < 16; i++){
      notes[i] = '';
    }
    for (let i = 0; i < this.notesInMeasure.length; i++){
      let currPosition = this.notesInMeasure[i].substring(2) - 0;
      let currPitch = this.notesInMeasure[i].substring(0,2);

      notes[currPosition] += currPitch;

    }
    return notes;
  }

  @api addMeasureNotes(songID) {
    SaveMusicNote({ note: this.notesInMeasure, stringId: this.measureId, song: songID})
        
    .then((result) => {
        console.log(result);
    })
    
    .catch((error) => {
        this.error = error;
    });
  }

  @api addLoadedNotes(){
    this.notesInMeasure = [];
    this.notesInMeasure = this.loadedNotes;
    this.handleNotesChange();
  }

  @api get currOctave() {
    return this.octave;
  }

  set currOctave(value) {
    this.setAttribute('currOctave', value);
    this.octave = value;
    this.handleNotesChange();
  }

  handleNotesChange() {
    let tds = this.template.querySelectorAll('td');
    let octaveOffset = (this.octave - 3) * 12;
    let picked = [];
    for (let j = 0; j < this.notesInMeasure.length; j++){
      let toPick = ((this.notesInMeasure[j] + '').substring(0,2) - octaveOffset).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '-' + (this.notesInMeasure[j] + '').substring(2);
      picked.push(toPick);
    }
    for (let i = 0; i < tds.length; i++){
      tds[i].style.background = 'white';
      if (picked.includes(tds[i].classList[0])) {
        tds[i].style.background = 'green';
      }
    }
    
  }
}