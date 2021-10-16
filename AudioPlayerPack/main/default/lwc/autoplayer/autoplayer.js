import { api, LightningElement } from "lwc";

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
    inputChord = [];
    /* stores the current chord progression the user is constructing */
    currChordProgression = [];


    isStrumming = true;
    
    setMode() {
        this.isStrumming = !this.isStrumming;

        this.tickCount = 0;
        this.chordCount = 0;
    }

    getInputChord(){
        return this.inputChord;
    }

    getCurrChordProgression(){
        return this.currChordProgression;
    }

    @api
    tickCallback(){
        console.log('tick in autoplayer');

        if(this.isStrumming){
            this.programmedStrumming();
        }else{
            this.playWholeKeyboard();
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

    /* This function plays a note when provided a note in string or integer formatting*/
    handleNote(note){
      /* Determines if the parameter is an integer, an array of integers (a chord), or a string and handles accordingly */
      if(note instanceof String){
          this.handleNoteHelper(note);
      } else if (Array.isArray(note)){
          for (i = 0; i < note.length; i++){
              this.handleNoteHelper(index2note2(note[i]));
          }
      } else if (note instanceof int){
          this.handleNoteHelper(index2note2(note));
      } else {
          console.log("handleNote was passed an invalid note. Therefore, the autostrummer did not play any sound.");
      }
  }

    /* handles a note after it has been converted to string + octave formatting */
    handleNoteHelper(note){
        if (!((note.length === 3) || (note.length === 2))){
            console.log("Attempted to pass an invalid note into the autostrummer. Notes should consist of a 1 or 2-char note and an octave if formatted as a string.");
            return;
        }
        if (note.length === 2){
            noteStr = note.substr(0, 1);
            octave = parseInt(note.substr(1, 1));
            this.dispatchEvent(new CustomEvent('autoplay', 
            {detail: 
                new AudioPlayerNote(octave, noteStr, 0)
            }));
        } else {
          noteStr = note.substr(0, 2);
          octave = parseInt(note.substr(2, 1));
          this.dispatchEvent(new CustomEvent('autoplay', 
          {detail: 
              new AudioPlayerNote(octave, noteStr, 0)
          }));
      }
    }

    changeInputNote(event){
        this.inputNote = event.target.value;
    }

    addInputNoteToChord(){
        if (isValidNote(this.inputNote)){
          this.inputChord.push(this.inputNote);
        }
        document.getElementById("chordDisplay").innerHTML = this.inputChord;
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
