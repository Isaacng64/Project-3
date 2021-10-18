import { LightningElement, track, api } from 'lwc';

export default class BeatPatternUi extends LightningElement {
    
    beatsTotal = 4;
    @track
    volumesList = [0.25, 0.25, 0.25, 0.25];

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


    clickVolumeHandler() {
        let current = parseInt(event.target.dataset.item);
        this.louder(current);
        if (event.target.className == 'slds-col outer') {
            this.resize(event.target.firstChild, this.volumesList[current]);
        } else {
            this.resize(event.target, this.volumesList[current]);
        }
    }

    louder(current) {
        
        this.volumesList[current] += 0.25;
        if (this.volumesList[current] > 1) {
            this.volumesList[current] = 0;
        }
        
        this.changeUpdateEvent();
    }

    resize(element, num) {
        let maxSize = 50;
        let size = maxSize * num;
        let margin = (maxSize * (1 - num))/2;
        element.style.width = size + 'px';
        element.style.height = size + 'px';
        element.style.margin = margin + 'px';
    }

    changeUpdateEvent() {
        let e = new CustomEvent('beatPatternUpdate', {detail: this.volumesList});
        //this.dispatchEvent(e);
    }



    resizeVolumesList(num) {
        
        let newList = [];
        for (let i = 0; i < num; i++) {
            if (this.volumesList.length > i) {
                newList.push(this.volumesList[i]);
            } else {
                newList.push(0.25);
            }
        }
        
        this.volumesList = newList;
        this.changeUpdateEvent();
    }


    @api
    highlightBeat(toHighlight) {
        for (let currentIndex = 0; currentIndex < this.beatsTotal; currentIndex++) {
            let currentDiv = (currentIndex * 2) + 2;
            this.template.querySelectorAll('div')[currentDiv].className = (currentIndex == toHighlight) ? "inner highlighted" : "inner unhighlighted";
        }
    }
}