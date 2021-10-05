import { LightningElement } from 'lwc';
import MessageService from '../messageService/messageService';

export default class MessageTester extends LightningElement {

    ms1 = new MessageService();
    ms2 = new MessageService();

    message = 'nothing yet';

    clicked(){
        this.ms1.postMessage('hi');
        this.message = this.ms2.receivedMessage;
    }

}