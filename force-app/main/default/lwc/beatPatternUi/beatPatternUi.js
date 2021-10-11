import { LightningElement, track, api } from 'lwc';

export default class BeatPatternUi extends LightningElement {
    
    beatsTotal = 4;
    @api
    getBeatsTotal() {
        return this.beatsTotal;
    }
    @api
    setBeatsTotal(num) {
        this.beatsTotal = num;
        this.resizeTempList(this.beatsTotal);
    }

    @track
    tempList = [0, 0.5, 1, 0.75];
    @api
    getTempList() {
        return this.tempList;
    }

    beatsUpdateButton() {
        this.setBeatsTotal(event.target.value);
    }

    resizeTempList(num) {
        
        var moreTempList = [];
        for (let i = 0; i < num; i++) {
            if (this.tempList.length > i) {
                moreTempList.push(this.tempList[i]);
            } else {
                moreTempList.push(0);
            }
        }
        
        this.tempList = moreTempList;
        this.changeUpdateEvent();
    }

    updateListValue() {
        this.tempList[event.target.dataset.item] = event.target.value;
        this.changeUpdateEvent();
    }

    changeUpdateEvent() {
        var e = new CustomEvent('beatPatternUpdate', {detail: this.tempList});
        this.dispatchEvent(e);
    }

    louder() {
        this.tempList[event.target.dataset.item] += 0.25;
        if (this.tempList[event.target.dataset.item] > 1) {
            this.tempList[event.target.dataset.item] = 1;
        }
        this.changeUpdateEvent();
    }

    softer() {
        this.tempList[event.target.dataset.item] -= 0.25;
        if (this.tempList[event.target.dataset.item] < 0) {
            this.tempList[event.target.dataset.item] = 0;
        }
        this.changeUpdateEvent();
    }
}