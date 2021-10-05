import { LightningElement } from 'lwc';

export default class ComponentCommunication extends LightningElement {
    handleEvent(event){
        alert("caught event!");
    }
}