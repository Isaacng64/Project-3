import { LightningElement, api } from 'lwc';
import strumImage from '@salesforce/resourceUrl/strum';
/* import { AudioPlayerNote } from 'c/commonUtils'; */

export default class GuitarString extends LightningElement {

    frets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

    currentFret = 0;
    openString = 0;
    @api stringNumber;
    @api strumImg = strumImage + '.png';

    setFretInString(event){
        if (this.currentFret = event.detail) {
            this.currentFret = 0;
        } else {
            this.currentFret = event.detail;
        }
        this.dispatchEvent(new CustomEvent('passcurrentfret', {detail: [this.currentFret, this.stringNumber]}));
    }

    @api
    setOpenString(num) {
        this.openString = num;
    }

    tuneUp() {
        this.setOpenString(parseInt(this.openString) + 1);
    }

    tuneDown() {
        this.setOpenString(parseInt(this.openString) - 1);
    }

    strum() {
        let noteToPlay = [parseInt(this.openString) + parseInt(this.currentFret), this.stringNumber];
        this.dispatchEvent(new CustomEvent('playguitarnote', {detail: noteToPlay, bubbles: true, composed: true}));
        console.log('strumming' + noteToPlay);

        /*let playNote = audioPlayerNote(this.currentFret, null, null, this.stringNumber);

        this.template.querySelector('c-audio-player').playPiano(playNote); */
    }

}
