export { sharp2flat, offset2note, note2freq, stdNote2components };

/* Utility class to smooth any particular API features out with the audioplayer and soundboard suite */

function sharp2flat(name) {
  /*
   * Converts any note name to a flat notation (for example C# -> Db)
   * This is for means of referencing the sound file paths correctly, which are all stored as flats
   * They are all stored as flats because #'s in static resource URL wasn't working, and this solution took 5 minutes
   * All file path names in practice SHOULD BE CASE INSENSITIVE, but this also makes sure to capitalize exactly as the file names are, anyway
   */

  if (name) {
    if (name.toLowerCase() == "g#" || name.toLowerCase() == "ab") {
      /* Special end case, all others work by incrementing next letter but can't increment G to A */
      return "Ab";
    }

    if (name.includes("#")) {
      const base = name.charAt(0);
      return nextCharacter(base).toUpperCase() + "b";
    } else {
      return name.length > 1
        ? name.charAt(0).toUpperCase() + "b"
        : name.charAt(0).toUpperCase(); /* ternary operator so cool */
    }
  } else {
    return null;
  }
}

function nextCharacter(c) {
  return String.fromCharCode(
    c.charCodeAt(0) + 1
  ); /* https://stackoverflow.com/questions/12504042/what-is-a-method-that-can-be-used-to-increment-letters */
}

function offset2note(relOffset, octave, name) {
  var baseOctave =
    Number(
      octave
    ); /* If base octave given, clean it, otherwise set to lowest octave 0 */
  if (!baseOctave) {
    baseOctave = 0;
  }

  let index; /* note name -> (note name + relOffset) % 12 where notename + reloffset is the index */
  if (name) {
    /* if name is given as input, clean it */
    name = sharp2flat(name); /* clean name input */
    index = indexOf(name) + relOffset;
  } else {
    index = relOffset;
  }

  let octOff = Math.trunc(index / 12.0); /* (index + BASE_INDEX_PIANO)  */

  const totalOctave = octOff + baseOctave;

  const newNote = clampBounds(index2noteH(index), totalOctave);

  return { name: newNote, octave: totalOctave };
}

let notes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

//const BASE_INDEX_PIANO = 0; /* means that everything is relative to C by default, the lowest in every octave per our files!!  */

function index2noteH(index) {
  return notes[index % 12];
}
/* written for the autostrummer */
function index2note2(index) {
  returnString = "";
  returnString += notes[index % 12];
  returnString += Math.floor(index / 12);
  return returnString;
}
/* written for the autostrummer, takes note string and returns integer */
function note2index(note){
    returnInt = 0;
    if (note.length === 2){
        noteStrPart = note.substr(0, 1);
        noteOctave = parseInt(note.substr(1, 1));
        returnInt += notes.indexOf(noteStrPart);
        returnInt += noteOctave*12;
        if (returnInt <= 84){
            return returnInt;
        }
    }
    noteStrPart = note.substr(0, 2);
    noteOctave = parseInt(note.substr(2, 1));
    returnInt += notes.indexOf(noteStrPart);
    returnInt += noteOctave*12;
    if (returnInt <= 84){
        return returnInt;
    }
    console.log("note2index function in music helper was provided invalid string.");
}

function indexOf(name) {
  return notes.indexOf(sharp2flat(name)); // notes.indexOf(name) - BASE_INDEX_PIANO;
}

function isValidNote(note){
    console.log("we made it to isValidNote");
    isRightLength = (note.length === 3 || note.length === 2);
    isLegalNote = (notes.contains(note.substr(0, 2)) || notes.contains(note.substr(0, 1)));
    hasOctave = ((parseInt(note.substr(note.length-1, 1)) < 8));
    return (isRightLength && isLegalNote && hasOctave);

}

/*
function clampBounds(name, octave) {
  /* Clamp piano key bounds because of our sound file extents
    if (octave == 0){
        if (notes.indexOf(name) < BASE_INDEX_PIANO){ // <3 lol
            return notes[BASE_INDEX_PIANO];
        }else{
            return name;
        }
  if (octave == 7) {
    return "C";
  } else {
    return name;
  }
}
*/

function stdNote2components(stdNote) {
  if (stdNote) {
    let name;
    let octave;
    if (stdNote.length == 3) {
      octave = stdNote.charAt(2);
      name = stdNote.charAt(0) + stdNote.charAt(1);
    } else {
      octave = stdNote.charAt(1);
      name = stdNote.charAt(0);
    }

    return { name: name, octave: octave };
  } else {
    return null;
  }
}

function note2freq({ octave, name }) {
  const C4 = 261.63;
  let x = octave - 4;
  let factor = Math.pow(2.0, x);
  let Cfreq = factor * C4;

  let index = indexOf(name);
  switch (index) {
    case 0:
      return Cfreq;
      break;
    case 1:
      return Cfreq * 1.067871;
      break;
    case 2:
      return Cfreq * 1.125;
      break;
    case 3:
      return Cfreq * 1.201354;
      break;
    case 4:
      return Cfreq * 1.265625;
      break;
    case 5:
      return Cfreq * 1.3333333;
      break;
    case 6:
      return Cfreq * 1.42382;
      break;
    case 7:
      return Cfreq * 1.5;
      break;
    case 8:
      return Cfreq * 1.6;
      break;
    case 9:
      return Cfreq * 1.6875;
      break;
    case 10:
      return Cfreq * 1.8;
      break;
    case 11:
      return Cfreq * 1.8984375;
      break;
  }
}
