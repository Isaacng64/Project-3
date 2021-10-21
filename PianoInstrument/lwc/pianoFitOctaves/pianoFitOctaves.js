import { LightningElement } from 'lwc';
import { pianoNotes, chordPiano } from 'c/pianoNotes';
/* the import is required to construct a new AudioPlayerNote */ 
import { AudioPlayerNote } from 'c/commonUtils';

export default class PianoInstrument extends LightningElement {
    
    //Variable to show the Key
    note = 'Click the Key';
    chordText;

    // Octaves to Display in the Piano, dynamically changed
    numOctave = 2;
    // Information about the Octaves that are displayed
    octaveZero = 0;
    octaveOne = 1;
    octaveTwo = 2;
    //Numero of Keys to be moved - +12 is one Octave
    firstKey = 0;
    lastKey = 36;

    // Slice of the number of the Octaves to Show (3)
    piano = pianoNotes.slice(this.firstKey, this.lastKey);
    pianoChords = [...chordPiano];

    // Function that will Add One Octave
    addOctave() {
        if (this.numOctave < 7){
            // Add one Octave to the Piano
            this.numOctave+= 1;
            this.octaveZero+= 1;
            this.octaveOne+= 1;
            this.octaveTwo+= 1;
            //Move forward 12 keys 
            this.firstKey += 12;
            this.lastKey += 12; 
            // Refresh the Piano and the Keys
            this.piano = pianoNotes.slice(this.firstKey, this.lastKey);
        }
    }    

    decreaseOctave() {
        if (this.numOctave > 2){
            // Decrease one Octave to the Piano
            this.numOctave-= 1;
            this.octaveZero-= 1;
            this.octaveOne-= 1;
            this.octaveTwo-= 1;
            //Move back 12 keys 
            this.firstKey -= 12;
            this.lastKey -= 12; 
            // Refresh the Piano and the Keys
            this.piano = pianoNotes.slice(this.firstKey, this.lastKey);
        }
    } 

    /*
    in the event handler, when a piano key is clicked all associated data for that key (note, name, color, and octave which is stored in pianoNotes)
    is sent as event details (evt.detail) and broken up into variables note, name, and octave. 
    */
    handleKeyClickCE(evt) {
        // detail will hold the information of the Key
        let currentNote = evt.detail;
        // Detail of the Key
        let name = currentNote.name;
        let octave = currentNote.octave;
        this.note = currentNote.key;
        /* event details are placed in to current Note, where it broken up into the note, name, and octave variable */

        /* a new AudioPlayerNote is constructed with name, and octave as the name_string and octave_integer respectfuly */
        let playNote = new AudioPlayerNote(null, name, octave, null)

        /* querySelector is used to access playPiano element of the audioPlayer js file using the created AudioPlayerNote*/
        this.template.querySelector("c-audio-player").playPiano(playNote);

    }

    handleClickChord(evt){
        // detail will hold the information of the Chord
        let currentChord = evt.detail;
        this.chordText = currentChord.name + '(' + currentChord.keys.first + ', ' + currentChord.keys.second + ', ' + currentChord.keys.third + ')';
        // Detail of the Key
        let playNoteA = new AudioPlayerNote(null, currentChord.keys.first, this.octaveOne, null)
        let playNoteB = new AudioPlayerNote(null, currentChord.keys.second, this.octaveOne, null)
        let playNoteC = new AudioPlayerNote(null, currentChord.keys.third, this.octaveOne, null)
        console.log(currentChord.name + ' - ' + currentChord.keys.first + ' - ' + currentChord.keys.second + ' - ' + currentChord.keys.third + ' - ' + this.octaveOne);
        this.template.querySelector("c-audio-player").playPiano(playNoteA);
        this.template.querySelector("c-audio-player").playPiano(playNoteB);
        this.template.querySelector("c-audio-player").playPiano(playNoteC);
    }

    /* 
    Next Iteration:
    Code below was used to set Basic Cords in the Piano
    Is required to create a New Functionality which will set the Chord
    Functions to be Used are in the basicUtils Package
    - getMajorTriad
    - getMinorTriad
    - getDiminishedTriad

    "You build a major chord by starting out with a root note and then adding 
    other notes from the desired chord's scale. 
    For example, if you want to build a G major chord, you play the root note G, 
    and add the third and fifth notes (or third and fifth intervals) from the G major 
    scale on top of the root note."

    isInitialized;
    renderedCallback() {
        if (!this.isInitialized) {
            if ( this.template.querySelector("c-basic-utils") != null) {
                console.log(console.log(this.template.querySelector("c-basic-utils").getMajorTriad(3)));
                console.log(console.log(this.template.querySelector("c-basic-utils").getMinorTriad(0)));
                console.log(console.log(this.template.querySelector("c-basic-utils").getDiminishedTriad(0)));
                this.isInitialized = true;
            }
        }
    }
    */
}