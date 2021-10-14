import { LightningElement, track, api } from 'lwc';

export default class BeatPatternUi extends LightningElement {
    
    beatsTotal = 4;
    currentPage = 0;
    @track
    volumesList = [0.75, 0.25, 0.25, 0.25];

    @api
    getBeatsTotal() {
        return this.beatsTotal;
    }

    @api
    setBeatsTotal(num) {
        this.beatsTotal = num;
        this.resizeVolumesList(this.beatsTotal);
    }

    @api
    getTempList() {
        return this.volumesList;
    }

    /*
    beatsUpdateButton() {
        this.setBeatsTotal(event.target.value);
    }
    */

    //list resizing and volume setting methods
    resizeVolumesList(num) {
        
        let newList = [];
        for (let i = 0; i < num; i++) {
            if (this.volumesList.length > i) {
                newList.push(this.volumesList[i]);
            } else {
                newList.push(0);
            }
        }
        
        this.volumesList = newList;
        this.changeUpdateEvent();
    }

    updateListValue() {
        this.volumesList[event.target.dataset.item] = event.target.value;
        this.changeUpdateEvent();
    }

    louder() {
        let current = parseInt(this.currentPage) * 4 + parseInt(event.target.dataset.item);
        this.volumesList[current] += 0.25;
        if (this.volumesList[current] > 1) {
            this.volumesList[current] = 0;
        }

        this.changeUpdateEvent();
    }

    softer() {
        let current = parseInt(this.currentPage) * 4 + parseInt(event.target.dataset.item);
        this.volumesList[current] -= 0.25;
        if (this.volumesList[current] < 0) {
            this.volumesList[current] = 0;
        }

        this.changeUpdateEvent();
    }

    changeUpdateEvent() {
        let e = new CustomEvent('beatPatternUpdate', {detail: this.volumesList});
        this.dispatchEvent(e);
    }


    //pagination methods
    get smallList() {
        let smallList = [];
        for (let i = 0; i < 4; i++) {
            if (this.volumesList.length > (this.currentPage * 4 + i)) {
                smallList.push(100 * this.volumesList[this.currentPage * 4 + i]);
            }
        }

        return smallList;
    }

    nextPage() {
        if (this.currentPage < this.totalPages - 1) {
            this.currentPage += 1;
        }
    }

    lastPage() {
        if (this.currentPage > 0) {
            this.currentPage -= 1;
        }
    }

    get pageNum() {
        return parseInt(this.currentPage) + 1;
    }

    get totalPages() {
        return Math.ceil(this.volumesList.length/4);
    }

    @api
    highlightBeat(num) {
        //this.volumesList[num] = 0.1;
    }
}