import { LightningElement, track, api } from 'lwc';

export default class BeatPatternUi extends LightningElement {
    
    page = 0;

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
        var current = parseInt(this.page) * 4 + parseInt(event.target.dataset.item);
        this.tempList[current] += 0.25;
        if (this.tempList[current] > 1) {
            this.tempList[current] = 1;
        }
        this.changeUpdateEvent();
    }

    softer() {
        var current = parseInt(this.page) * 4 + parseInt(event.target.dataset.item);
        this.tempList[current] -= 0.25;
        if (this.tempList[current] < 0) {
            this.tempList[current] = 0;
        }
        this.changeUpdateEvent();
    }

    get smallList() {
        var smallList = [];
        for (var i = 0; i < 4; i++) {
            if (this.tempList.length > (this.page * 4 + i)) {
                smallList.push(this.tempList[this.page * 4 + i]);
            }
        }
        return smallList;
    }

    nextPage() {
        if (this.page * 4 < this.tempList.length - 4) {
            this.page += 1;
        }
    }

    lastPage() {
        if (this.page > 0) {
            this.page -= 1;
        }
    }
}