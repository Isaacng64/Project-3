import { createElement } from 'lwc';
import Songbuilder from 'c/songbuilder';
import CreateMeasure from '@salesforce/apex/PianoController.CreateMeasure';
import CreateSong from '@salesforce/apex/PianoController.CreateSong';
import ClearSong from '@salesforce/apex/PianoController.ClearSong';
import NameSong from '@salesforce/apex/PianoController.NameSong';
import RetrieveSong from '@salesforce/apex/PianoController.LoadMusicNote';
import GetAllSongs from '@salesforce/apex/PianoController.GetSongsByName';

const mockRecords = require("./data/recordMock.json");

jest.mock(
    "@salesforce/apex/PianoController.LoadMusicNote",
  
    () => ({
      default: jest.fn()
    }),
  
    { virtual: true }
  );

describe('c-songbuilder', () => {
    beforeEach(() => {
        const element = createElement('c-songbuilder', { 
            is: Songbuilder
        });
        
        document.body.appendChild(element);
        
    });
    
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Create Song', () => {
        const element = document.querySelector('c-songbuilder');

        expect(element).toBe(element);

    });

    it('Add and Remove Measure Test', async () => {
        const element = document.querySelector('c-songbuilder');

        let buttonsList = element.shadowRoot.querySelectorAll("button");
        expect(buttonsList.length).toBe(8);

        buttonsList[6].click();
        buttonsList[6].click();
        let measureList = element.shadowRoot.querySelectorAll("c-c/songbuildermeasure");
        expect(measureList.length).toBe(2);
        buttonsList[7].click();
        measureList = element.shadowRoot.querySelectorAll("c-c/songbuildermeasure");
        expect(measureList.length).toBe(1);
    });

    it('New Song Test', () => {
        const element = document.querySelector('c-songbuilder');
        
        let buttonsList = element.shadowRoot.querySelectorAll("button");
        expect(buttonsList.length).toBe(8);

        buttonsList[6].click();
        buttonsList[6].click();
        let measureList = element.shadowRoot.querySelectorAll("c-c/songbuildermeasure");
        expect(measureList.length).toBe(2);
        buttonsList[5].click();
        measureList = element.shadowRoot.querySelectorAll("c-c/songbuildermeasure");
        expect(measureList.length).toBe(0);
    });

    it('Load Song', () => {
        const element = document.querySelector('c-songbuilder');
        
        let buttonsList = element.shadowRoot.querySelectorAll("button");
        expect(buttonsList.length).toBe(8);

        buttonsList[3].click();
        buttonsList = element.shadowRoot.querySelectorAll("button");
        expect(buttonsList.length).toBe(9);
        buttonsList[8].click();

    });

    it('Save Song', () => {
        const element = document.querySelector('c-songbuilder');
        
        let buttonsList = element.shadowRoot.querySelectorAll("button");
        expect(buttonsList.length).toBe(8);

        buttonsList[4].click();
        buttonsList = element.shadowRoot.querySelectorAll("button");
        expect(buttonsList.length).toBe(9);
        buttonsList[8].click;

    });
});