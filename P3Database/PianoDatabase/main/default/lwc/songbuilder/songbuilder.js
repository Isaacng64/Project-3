import { LightningElement, track, api, wire } from 'lwc';
import CreateMeasure from '@salesforce/apex/PianoController.CreateMeasure';

export default class songbuilder extends LightningElement {
  @track dataForDynamicComponentCreation = [];
  index = 0;
  @track octave = 4;

  addNewMeasure() {
    CreateMeasure()
    
    .then((result) => {
      console.log('measureId in parent: ' + result);
      this.dataForDynamicComponentCreation = [
        ...this.dataForDynamicComponentCreation,
        {
            requiredKey: this.index, 
            measureid: (result + '')
        }
      ];
    })
    
    .catch((error) => {
        this.error = error;
    });

    this.index++;
  }

  removeMeasure() {
    this.dataForDynamicComponentCreation = [
        ...this.dataForDynamicComponentCreation.slice(0, -1)
    ];
  }
  
  addOctave() {
    let cCells = this.template.querySelectorAll('.cCell');
    if (cCells[0].innerHTML != 'C8') {
      for (let i = 0; i < 3; i++){
          var oldText = cCells[i].innerHTML;
          cCells[i].innerHTML = '';
          
          var newText = 'C' + (oldText.substring(1) - 0 + 1);
          cCells[i].innerHTML = newText;
      }
    }
    this.octave = cCells[0].innerHTML.substring(1) - 0;
  }

  subOctave() {
    let cCells = this.template.querySelectorAll('.cCell');
    if (cCells[2].innerHTML != 'C1') {
      for (let i = 0; i < 3; i++){
          var oldText = cCells[i].innerHTML;
          cCells[i].innerHTML = '';
          
          var newText = 'C' + (oldText.substring(1) - 1);
          cCells[i].innerHTML = newText;
      }
    }
    this.octave = cCells[0].innerHTML.substring(1) - 0;
  }

  saveSong() {
    let measureCMPs = this.template.querySelectorAll('c-songbuildermeasure');
    console.log('measureCMPs length: ' + measureCMPs.length);
    for (let i = 0; i < measureCMPs.length; i++){
      measureCMPs[i].addMeasureNotes();
    }

    alert('Your song has been saved!');
  }
}