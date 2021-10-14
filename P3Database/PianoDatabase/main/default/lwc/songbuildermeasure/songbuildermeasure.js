import { LightningElement, track, api, wire } from 'lwc';
import UpdateMeasure from '@salesforce/apex/PianoController.UpdateMeasure';
import SaveMusicNote from '@salesforce/apex/PianoController.SaveMusicNote';

export default class songbuildermeasure extends LightningElement {
  @api measureId;
  @api octave;
  notesInMeasure = [];

  renderedCallback() {
    let tds = this.template.querySelectorAll('td');
    var self = this;
    console.log('measureId in measure: ' + this.measureId);
    for (let i = 0; i < tds.length; i++) {
      tds[i].addEventListener('click', function(){
        let octaveOffset = (self.octave - 3) * 12;
        if (this.style.background == 'green'){
          let toRemove = self.notesInMeasure.indexOf((this.classList[0].split('-')[0] - 0 + octaveOffset).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + this.classList[0].split('-')[1]);
          if (toRemove != -1) {
            self.notesInMeasure.splice(toRemove, 1);
          }
          this.style.background = 'white';
          console.log(self.notesInMeasure);
        } else {
          console.log('current octave' + self.octave);
          self.notesInMeasure.push((this.classList[0].split('-')[0] - 0 + octaveOffset).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + this.classList[0].split('-')[1]);
          this.style.background = 'green';
          console.log(self.notesInMeasure);
        }
      }, false);
    }
  }

  @api addMeasureNotes() {
    console.log('called child addMeasureNotes');
    SaveMusicNote({ note: this.notesInMeasure, stringId: this.measureId })
        
        .then((result) => {
            console.log(result);
        })
        
        .catch((error) => {
            this.error = error;
        });
  }

  @api get currOctave() {
    return this.octave;
  }

  set currOctave(value) {
    this.setAttribute('currOctave', value);
    this.octave = value;
    this.handleValueChange(value);
  }

  handleValueChange(value) {
    let tds = this.template.querySelectorAll('td');
    let octaveOffset = (this.octave - 3) * 12;
    let picked = [];
    for (let j = 0; j < this.notesInMeasure.length; j++){
      let toPick = ((this.notesInMeasure[j] + '').substring(0,2) - octaveOffset).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '-' + (this.notesInMeasure[j] + '').substring(2);
      picked.push(toPick);
      console.log(picked);
    }
    for (let i = 0; i < tds.length; i++){
      tds[i].style.background = 'white';
      if (picked.includes(tds[i].classList[0])) {
        tds[i].style.background = 'green';
      }
    }
    
  }
}