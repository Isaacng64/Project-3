import { api, LightningElement, track } from "lwc";

import { AudioPlayerNote } from "c/commonUtils";
import { sharp2flat, offset2note, note2freq, stdNote2components, index2note2, note2index, isValidNote } from "c/commonUtils";
import SystemModstamp from "@salesforce/schema/Account.SystemModstamp";

export default class Autoplayer extends LightningElement {
  strumPattern = ["E", "c#", "Ab", "A"];
  strumPattern2 = ["E", "e", "d#", "E"];

  tickCount = 0;
  chordCount = 0;

  isStrumming = true;

    /* stores the current value of the input note input from the HTML */
    inputNote = "Ab1";
    /* Stores the current value of the chord visible in the HTML*/
    @api
    inputChord = ["Ab1"];
    /* 2D array that stores the current chord progression the user is constructing */
    @api
    currChordProgression = [];
    /* The string value for displaying the inputChord on the HTML*/
    @api
    displayInputChord = "";
    /* The string value for displaying the currChordProgression on the HTML*/
    @api
    displayCurrChordProgression = "";


    isStrumming = true;
    
    setMode() {
        this.isStrumming = !this.isStrumming;

        this.tickCount = 0;
        this.chordCount = 0;
    }
    /* updates the chord for displaying on HTML */
    updateInputChordDisplay(){
        let returnString = "";
        for (let i = 0; i < this.inputChord.length; i++){
          returnString += this.inputChord[i] + ", ";
        }
        if (returnString.length > 1){
          returnString = returnString.substr(0, returnString.length-2);
        }
        this.displayInputChord = returnString;
    }
    /* updates the chord progression for displaying on the HTML*/
    updateCurrChordProgressionDisplay(){
      let returnString = "";
      if (this.currChordProgression.length === 0){
        this.displayCurrChordProgression = "";
        return;
      }
      for (let i = 0; i < this.currChordProgression.length; i++){
        for (let c = 0; c < this.currChordProgression[i].length; c++){
          returnString += this.currChordProgression[i][c] + ", ";
        }
        returnString = returnString.substr(0, returnString.length-2);
        returnString += " -> ";
      }
      returnString = returnString.substr(0, returnString.length-4);
      this.displayCurrChordProgression = returnString;
    }

    getCurrChordProgression(){
        return this.currChordProgression;
    }

    @api
    tickCallback(){
        console.log('tick in autoplayer');

        if(this.isStrumming){
            this.playChordProgression(this.currChordProgression);
        }
    this.tickCount += 1;
    }

    playWholeKeyboard() {
        this.dispatchEvent(
        new CustomEvent("autoplay", {
            detail: new AudioPlayerNote(this.tickCount % 85, "A", 0)
        }));
    }

    programmedStrumming() {
        this.dispatchEvent(
        new CustomEvent("autoplay", {
            detail: new AudioPlayerNote(0, this.strumPattern[this.chordCount], 1)
        }));

        this.dispatchEvent(
        new CustomEvent("autoplay", {
            detail: new AudioPlayerNote(0, this.strumPattern2[this.chordCount], 3)
        }));

        if (this.tickCount >= this.strumPattern.length) {
            this.tickCount = 0;
        }
        if (!this.tickCount % 3) {
            this.chordCount += 1;
        }
        if (this.chordCount >= 4) {
            this.chordCount = 0;
        }
    }

    /* This function plays the current chord in a chord progression when provided one */
    playChordProgression(chordProg){
      /* Some if blocks to catch invalid inputs, chord progression must be a 2D array of chords */
      if (!Array.isArray(chordProg)){
        return;
      }
      if (chordProg.length === 0){
        return;
      }
      if (!Array.isArray(chordProg[0])){
        return;
      }

      this.handleNote(chordProg[this.chordCount%chordProg.length]);
      this.chordCount++;

    }

    /* This function plays a note or chord when provided a note in string or integer formatting or a chord*/
    handleNote(note){
      /* Determines if the parameter is an integer, a chord, or a string and handles accordingly */
      if(note instanceof String){
          this.handleNoteHelper(note);
      } else if (Array.isArray(note)){
          for (let i = 0; i < note.length; i++){
              console.log(note[i]);
              this.handleNoteHelper(note[i]);
          }
      } else if (note instanceof int){
          this.handleNoteHelper(index2note2(note));
      } else {
          console.log("handleNote was passed an invalid note. Therefore, the autostrummer did not play any sound.");
      }
  }

    /* handles a note after it has been converted to string + octave formatting */
    handleNoteHelper(note){
        console.log(note);
        if (!((note.length === 3) || (note.length === 2))){
            console.log("Attempted to pass an invalid note into the autostrummer. Notes should consist of a 1 or 2-char note and an octave if formatted as a string.");
            return;
        }
        if (note.length === 2){
            let noteStr = note.substr(0, 1);
            let octave = parseInt(note.substr(1, 1));
            this.dispatchEvent(new CustomEvent('autoplay', 
            {detail: 
                new AudioPlayerNote(octave, noteStr, 0)
            }));
        } else {
          let noteStr = note.substr(0, 2);
          let octave = parseInt(note.substr(2, 1));
          this.dispatchEvent(new CustomEvent('autoplay', 
          {detail: 
              new AudioPlayerNote(octave, noteStr, 0)
          }));
      }
    }

    changeInputNote(event){
        this.inputNote = event.target.value;
    }

    /* Used with the button on the HTML to update the inputChord */
    addInputNoteToChord(){
        if (isValidNote(this.inputNote) && (!this.inputChord.includes(this.inputNote))){
          this.inputChord.push(this.inputNote);
        }
      this.updateInputChordDisplay();
    }

    /* Used with the button on the HTML to update the inputChordProgression*/
    addInputChordToChordProgression(){
      if (this.inputChord.length === 0){
        return;
      }
      let tempInputChord = [];
      for (let i = 0; i < this.inputChord.length; i++){
        tempInputChord.push(this.inputChord[i]);
      }
      this.currChordProgression.push(tempInputChord);
      this.updateCurrChordProgressionDisplay();
    }

    /* used to clear the current chord */
    clearInputChord(){
      this.inputChord = [];
      this.updateInputChordDisplay();
    }

    /* used to delete the last value from current chord progression */
    truncateChordProgression(){
      this.currChordProgression.pop();
      this.updateCurrChordProgressionDisplay();
    }





  /* below this point is logic for displaying chords that are being played on instruments */

  displayChordOnIntrument(chord) {
    //chord[] is integer array for note index in chord
    let currentString = 0;
    let strings = [16, 21, 26, 31, 35, 40]; //guitar defaults, could take an input for other instruments

    for (let i = 0; i < chord.length; i++) {
      currentString = checkStrings(strings, currentString, chord[i]);
      if (currentString == null) {
        //ran out of strings
        break;
      }
    }
  }

  checkStrings(strings, currentString, currentNote) {
    //returns string number to start with for the next note

    if (currentNote < strings[currentString]) {
      //note is too low to be displayed
      return currentString; //start with same string again
    } else if (currentNote < strings[currentString] + 5) {
      displayHeldFret(currentString, currentNote - strings[currentString]);
      currentString++; //string is being used, start with next
      return currentString;
    } else {
      //string is too low, try next
      currentString++;
      if (currentString < strings.length) {
        //check next string
        return checkStrings(strings, currentString, currentNote);
      }
      return null; //no strings left
    }
  }

  displayHeldFret(stringNum, fretNum) {
    //call instruments function to set current fret here
  }
}
