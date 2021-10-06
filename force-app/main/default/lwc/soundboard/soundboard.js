import { LightningElement } from 'lwc';

export default class Soundboard extends LightningElement {

    tickHandle(){
        this.template.querySelector("c-autoplayer").tickCallback();
    }

}