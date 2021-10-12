import { LightningElement, api } from 'lwc';

export default class basicUtils extends LightningElement {

  noteList = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']; //This should not be tampered with. 

  /*
   * Note that the flats (and sharps) in our system correspond to the black keys on a keyboard. Technically, any note can be made into a sharp or flat. For example,
   * Fb is the same note as E. B# would be the same note as C (These are white keys on a keyboard). There's no explicit need to work with these types of notations 
   * in our utilities for now, but it may be helpful to understand that these are valid notations for notes as well. To start with, our instrument UI's should just 
   * display the flat/sharp values for the black keys on a keyboard. The simplest choice would be to stick with flat names as in noteList, but there are functions 
   * here to convert those to sharps if you wish to use them. (The main reason to use these would be to display information to the user.)
   */

  @api
  pitchMap = []; /* The pitch is the index; the note will be a string from noteList. */

  @api
  keySignature = []; /* When set, this defines valid notes in the key signature. */

  @api
  keySignaturePitches = []; /* When set, this defines valid pitches (indexes of our pitchMap) for the current key signature. */

  @api
  setPitchMap(finalVal, flatNoteVal) { /*To Use: Provide the total number of pitches for the instrument (# of sound files) as finalVal and the starting note name as a string flatNoteVal; (Should match something in noteList.) */

    let curPos = this.noteList.findIndex(item => item === flatNoteVal);

    for (let i = 0; i < finalVal; i++) {
      this.pitchMap.push(this.noteList[curPos]);
      curPos++;
      if (curPos > 11) {
        curPos = 0;
      }
    }
    if (this.pitchMap.includes(undefined)) { /* We should never have an undefined value in our picklist. */
      console.warn('An error occurred in setPitchMap. Second parameter should match one of the following values: ' + this.noteList);
      this.pitchMap = [];
    }

  }

  @api
  getNoteFromPitch(pitch) { /* Returns the note name (in a flat format). */

    return this.pitchMap[pitch];
  }

  @api
  getNotesFromPitches(pitches) { /* Returns an array of the flat note names when provided an array of pitches. */

    if (pitches.length < 1) {
      console.warn('Pitches should be an array for getNotesFromPitches');
      return null;
    }

    let toReturn = [];

    for (const c of pitches) {

      if (this.pitchMap.length > c && c >= 0) {
        toReturn.push(this.pitchMap[c]);
      } else {
        console.warn('Value of: ' + c + ' is not a valid pitch; it is probably out of our index bounds.');
      }
    }

    return toReturn;
  }

  @api
  getMajorTriad(pitch) { /* Pitch should be an integer; this will return an integer array defining a simple major triad or an inverted major triad if we're near end of our pitchMap array. */

    if (pitch >= this.pitchMap.length) {
      console.warn('The pitch supplied to "getMajorTriad" was invalid; it is probably out of our index bounds.');
      return null;
    }

    if (pitch + 7 <= this.pitchMap.length) {
      return [pitch, pitch + 4, pitch + 7];
    } else if (pitch + 4 <= this.pitchMap.length) {
      return [pitch - 5, pitch, pitch + 4];
    } else {
      return [pitch - 8, pitch - 5, pitch];
    }

  }

  @api
  getMinorTriad(pitch) { /* Pitch should be an integer; this will return a simple minor triad or an inverted minor triad if we're near the end of our pitchMap array. */

    if (pitch >= this.pitchMap.length) {
      console.warn('The pitch supplied to "getMinorTriad" was invalid; it is probably out of our index bounds.');
      return null;
    }

    if (pitch + 7 <= this.pitchMap.length) {
      return [pitch, pitch + 3, pitch + 7];
    } else if (pitch + 3 <= this.pitchMap.length) {
      return [pitch - 5, pitch, pitch + 3]
    } else {
      return [pitch - 9, pitch - 5, pitch];
    }

  }

  @api
  getDiminishedTriad(pitch) { /* Pitch should be an integer; this will return a diminished triad or an inverted diminished triad if we're near the end of our pitchMap array. */

    if (pitch >= this.pitchMap.length) {
      console.warn('The pitch supplied to "getDiminishedTriad" was invalid; it is probably out of our index bounds.');
      return null;
    }

    if (pitch + 6 <= this.pitchMap.length) {
      return [pitch, pitch + 3, pitch + 6];
    } else if (pitch + 3 <= this.pitchMap.length) {
      return [pitch - 6, pitch, pitch + 3]
    } else {
      return [pitch - 9, pitch - 6, pitch];
    }

  }

  @api
  setKeySignature(flatNote) { /* Provide the base flat note as a string to define the key signature. */

    if (this.keySignature !== []) {
      this.keySignature = [];
    }

    for (const c of this.noteList) {

      if (c === flatNote) {
        this.keySignature.push(flatNote);
        let pos = this.noteList.findIndex(item => item === flatNote);
        this.keySignature.push(this.noteList[(pos + 2) % 12]);
        this.keySignature.push(this.noteList[(pos + 4) % 12]);
        this.keySignature.push(this.noteList[(pos + 5) % 12]);
        this.keySignature.push(this.noteList[(pos + 7) % 12]);
        this.keySignature.push(this.noteList[(pos + 9) % 12]);
        this.keySignature.push(this.noteList[(pos + 11) % 12]);
        this.setKeySignaturePitches();
      }
    }

  }

  setKeySignaturePitches() {

    if (this.keySignaturePitches !== []) {
      this.keySignaturePitches = [];
    }

    for (let i = 0; i < this.pitchMap.length; i++) {
      for (const keyNote of this.keySignature) {
        if (this.pitchMap[i] === keyNote) {
          this.keySignaturePitches.push(i);
        }
      }
    }

  }

  @api
  getValidChordInKey(pitch) { /* As long as a key signature is currently set, this should return a valid chord in the current key signature. */

    if (this.keySignaturePitches.length === 0) {
      console.warn('No key signature is currently defined.');
      return null;
    }

    let pitchPosition = null;

    for (const c of this.keySignaturePitches) {
      if ((pitch % 12) === c) {
        pitchPosition = this.keySignaturePitches.indexOf(c);
      }
    }

    if (pitchPosition === 0 || pitchPosition === 3 || pitchPosition === 4) {
      return (this.getMajorTriad(pitch));
    } else if (pitchPosition === 1 || pitchPosition === 2 || pitchPosition === 5) {
      return (this.getMinorTriad(pitch));
    } else if (pitchPosition === 6) {
      return this.getDiminishedTriad(pitch);
    } else {
      console.warn('An error occurred in getValidChordInKey. Maybe you entered a pitch that is not in the current key?');
      return null;
    }
  }

  @api
  convertToSharp(flatNote) { /* Converts a flat note string to a sharp note string. */

    let toReturn = null;

    switch (flatNote) {
      case 'Db':
        toReturn = 'C#';
        break;
      case 'Eb':
        toReturn = 'D#';
        break;
      case 'Gb':
        toReturn = 'F#';
        break;
      case 'Ab':
        toReturn = 'G#';
        break;
      case 'Bb':
        toReturn = 'A#';
        break;
    }

    if (toReturn == null) {
      console.warn('Invalid string supplied to convertToSharp: ' + flatNote);
    }

    return toReturn;
  }

  @api
  convertToFlat(sharpNote) { /* Converts a sharp note string to a flat note string. */

    let toReturn = null;

    switch (sharpNote) {
      case 'C#':
        toReturn = 'Db';
        break;
      case 'D#':
        toReturn = 'Eb';
        break;
      case 'F#':
        toReturn = 'Gb';
        break;
      case 'G#':
        toReturn = 'Ab';
        break;
      case 'A#':
        toReturn = 'Bb';
        break;
    }

    if (toReturn == null) {
      console.warn('Invalid string supplied to convertToFlat: ' + sharpNote);
    }

    return toReturn;
  }
}
