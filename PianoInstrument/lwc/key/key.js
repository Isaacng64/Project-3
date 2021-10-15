import { LightningElement, api } from 'lwc';

export default class Key extends LightningElement {
    
    // Component Key will have the information of Note and Color of the Key
    @api componentkey;

    clickHandler(){
        // Custom Event to dispatch the Note Clicked
        const event = new CustomEvent('keyclickce',{
            detail: this.componentkey
        })
        console.log(this.componentkey.key)
        // Dispatch Event
        this.dispatchEvent(event);
    } 
}