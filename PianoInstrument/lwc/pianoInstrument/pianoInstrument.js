import { LightningElement, api } from 'lwc';
import { pianoNotes } from 'c/pianoNotes';
//import { AudioPlayerNote } from '../audioPlayer/audioPlayerNote';
/* the import is required to construct a new AudioPlayerNote */

export default class PianoInstrument extends LightningElement {
    
    piano = [...pianoNotes];
    note = 'Click the Key';

   
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
        
    }
}