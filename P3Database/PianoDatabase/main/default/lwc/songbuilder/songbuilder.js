import { LightningElement, track, api, wire } from 'lwc';
import CreateMeasure from '@salesforce/apex/PianoController.CreateMeasure';
import CreateSong from '@salesforce/apex/PianoController.CreateSong';
import ClearSong from '@salesforce/apex/PianoController.ClearSong';
import NameSong from '@salesforce/apex/PianoController.NameSong';
import RetrieveSong from '@salesforce/apex/PianoController.LoadMusicNote';
import GetAllSongs from '@salesforce/apex/PianoController.GetSongsByName';

export default class songbuilder extends LightningElement {
  @track dataForDynamicComponentCreation = [];
  index = 0;
  @track octave = 4;
  songID = '';
  songName;
  loadInputValue;
  saveInputValue;
  measureNotes = [];
  playing = false;
  loading = false;
  saving = false;
  @track listOfSongs = [];
  @track songToPlay = [];
  currNote = 0;

  connectedCallback(){
    CreateSong()
        
        .then((result) => {
            this.songID = result + '';
        })
        
        .catch((error) => {
            this.error = error;
        });
  }

  emptySong() {
    ClearSong({ song: this.songID })
        
        .then((result) => {
            console.log(result);
        })
        
        .catch((error) => {
            this.error = error;
        });
  }

  addNewMeasure() {
    CreateMeasure({ song: this.songID, pos: this.index })

    .then((result) => {
      this.dataForDynamicComponentCreation = [
        ...this.dataForDynamicComponentCreation,
        {
            requiredKey: this.index, 
            measureid: (result + ''),
            LoadedNotes: []
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

    this.index--;
  }

  newSong() {
    CreateSong()
        
      .then((result) => {
          this.songID = result + '';
          this.dataForDynamicComponentCreation = [];
          this.index = 0;
      })
      
      .catch((error) => {
          this.error = error;
      });
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
  startPlaying() {
    if (this.loading == true) {
      this.listOfSongs = [];
    }
    this.loading = false;
    this.saving = false;
    this.playing = !this.playing;
    this.currNote = 0;

    this.songToPlay = [];

    let measureCMPs = this.template.querySelectorAll('c-songbuildermeasure');

    for (let i = 0; i < measureCMPs.length; i++){
      let currMeasureNotes = measureCMPs[i].getNotesInMeasure();

      this.songToPlay = this.songToPlay.concat(currMeasureNotes);
    }
  }

  startSaving() {
    if (this.loading == true) {
      this.listOfSongs = [];
    }
    this.playing = false;
    this.loading = false;
    this.saving = !this.saving;
  }

  saveSong() {
    let measureCMPs = this.template.querySelectorAll('c-songbuildermeasure');
    this.emptySong();
    this.renameSong();
    for (let i = 0; i < measureCMPs.length; i++){
      measureCMPs[i].addMeasureNotes(this.songID);
    }
    alert('Your song has been saved!');
    this.saving = false;
  }

  startLoading() {
    if (this.loading == true) {
      this.listOfSongs = [];
    }
    this.playing = false;
    this.saving = false;
    this.loading = !this.loading;
  }

  loadAllSongs(){
    this.listOfSongs = [];
    GetAllSongs({ song: this.loadInputValue })
        
      .then((result) => {
          for (let i = 0; i < result.length; i++){
            this.listOfSongs = [
              ...this.listOfSongs,
              {
                  songName: result[i].substring(18),
                  songID: result[i].substring(0,18)
              }
            ];
          }
      })
      
      .catch((error) => {
          this.error = error;
      });
  }

  loadSong(event) {

    let loadingSongID = event.target.name;
    RetrieveSong({ song: loadingSongID })
        
    .then((result) => {
      this.songID = loadingSongID;
      this.dataForDynamicComponentCreation = [];
      this.index = 0;

      for (let i = 0; i < result.length; i+=2){
        let notesForMeasure = [];
        for (let j = 0; j < result[i+1].length; j+=4){
          notesForMeasure.push(result[i+1].substring(j, j + 4));
        }
        
        this.dataForDynamicComponentCreation = [
          ...this.dataForDynamicComponentCreation,
          {
              requiredKey: this.index, 
              measureid: (result[i]),
              LoadedNotes: notesForMeasure
          }
        ];

        this.index++;
      }

      this.loading = false;
    })
    
    .catch((error) => {
        this.error = error;
        if (error.body.message == 'List has no rows for assignment to SObject'){
          alert('No song found with that ID.');
        } else if (error.body.message == 'Argument cannot be null.') {
          alert('Please enter a song name.')
        }
    });
  }

  renameSong() {
    if (this.saveInputValue == ''){
      this.saveInputValue = this.songID;
    }
    NameSong({ song: this.songID, newName: this.saveInputValue })
        
        .then((result) => {
            console.log(result);
        })
        
        .catch((error) => {
            this.error = error;
        });
  }

  handleTick(){
    if (this.currNote == this.songToPlay.length) {
      this.currNote = 0;
    }

    for (let i = 0; i < this.songToPlay[this.currNote].length; i+=2){
      if (!(this.songToPlay[this.currNote] == '')) {
        let note = this.songToPlay[this.currNote].substring(i,i+2) - 0;
        this.template.querySelector("c-audio-player").playPianoInteger(note);
      }
    }

    this.currNote++;
  }

  handleLoadInputChange(event){
    this.loadInputValue = event.target.value;
  }

  handleSaveInputChange(event){
    this.saveInputValue = event.target.value;
  }
}