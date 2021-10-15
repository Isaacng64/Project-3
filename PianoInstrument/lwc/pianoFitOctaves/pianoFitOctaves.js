import { LightningElement } from 'lwc';
import { pianoNotes } from 'c/pianoNotes';
//import { AudioPlayerNote } from '../audioPlayer/audioPlayerNote';
/* the import is required to construct a new AudioPlayerNote */ 

export default class PianoInstrument extends LightningElement {
    
    //Variable to show the Key
    note = 'Click the Key';

    // Octaves to Display in the Piano, dynamically changed
    numOctave = 2;
    octaveZero = 0;
    octaveOne = 1;
    octaveTwo = 2;
    firstKey = 0;
    lastKey = 36;

    // piano = [...pianoNotes];
    // Slice of the number of the Octaves to Show (3)
    piano = pianoNotes.slice(this.firstKey, this.lastKey);

    addOctave() {
        if (this.numOctave < 7){
            this.numOctave+= 1;
            this.octaveZero+= 1;
            this.octaveOne+= 1;
            this.octaveTwo+= 1;
            this.firstKey += 12;
            this.lastKey += 12; 
            this.piano = pianoNotes.slice(this.firstKey, this.lastKey);
        }
    }    

    decreaseOctave() {
        if (this.numOctave > 2){
            this.numOctave-= 1;
            this.octaveZero-= 1;
            this.octaveOne-= 1;
            this.octaveTwo-= 1;
            this.firstKey -= 12;
            this.lastKey -= 12; 
            this.piano = pianoNotes.slice(this.firstKey, this.lastKey);
        }
    } 

    /*
    in the event handler, when a piano key is clicked all associated data for that key (note, name, color, and octave which is stored in pianoNotes)
    is sent as event details (evt.detail) and broken up into variables note, name, and octave. 
    */
    handleKeyClickCE(evt) {

        let currentNote = evt.detail;
        let name = currentNote.name;
        let octave = currentNote.octave;
        this.note = currentNote.key;
        /* event details are placed in to current Note, where it broken up into the note, name, and octave variable */

        /* a new AudioPlayerNote is constructed with name, and octave as the name_string and octave_integer respectfuly */
        //let playNote = new AudioPlayerNote(null, name, octave, null)

        /* querySelector is used to access playPiano element of the audioPlayer js file using the created AudioPlayerNote*/
        //this.template.querySelector("c-audio-player").playPiano(playNote);
        
        /* querySelector is used to access playPiano element of the audioPlayer js file using the created AudioPlayerNote*/
        // this.template.querySelector("c-audio-player").playPiano(playNote);
        // this.template.querySelector("c-audio-player").playPianoInteger(35);
        // this.template.querySelector("c-audio-player").playPiano(new AudioPlayerNote(35));    
    }
    
}