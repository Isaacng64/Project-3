import { api, LightningElement } from 'lwc';

export default class Autoplayer extends LightningElement {


    @api
    tickCallback(){
        console.log('tick in autoplayer');
    }

}