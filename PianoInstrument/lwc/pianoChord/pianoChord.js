import { LightningElement, api} from 'lwc';

export default class PianoChord extends LightningElement {

    @api chord;

    clickChordHandler(){
        // Custom Event to dispatch the Note Clicked
        const event = new CustomEvent('keyclickchord',{
            detail: this.chord
        })
        console.log(this.chord.id)
        // Dispatch Event
        this.dispatchEvent(event);
    } 
}