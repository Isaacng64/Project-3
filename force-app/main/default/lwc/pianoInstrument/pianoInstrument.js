import { LightningElement, api } from 'lwc';
import { pianoNotes } from 'c/pianoNotes';
import { AudioPlayerNote } from '../audioPlayer/audioPlayerNote';

export default class PianoInstrument extends LightningElement {
    
    piano = [...pianoNotes];
    note = 'Click the Key';

   

    handleKeyClickCE(evt) {
        let currentNote = evt.detail;
        let name = currentNote.name;
        let octave = currentNote.octave;

        let playNote = new AudioPlayerNote(null, name, octave, null)

        this.note = currentNote.key;
        this.template.querySelector("c-audio-player").playPiano(playNote);
        //this.playPianoNote = new AudioPlayerNote(null, name, octave, null);
    }
}