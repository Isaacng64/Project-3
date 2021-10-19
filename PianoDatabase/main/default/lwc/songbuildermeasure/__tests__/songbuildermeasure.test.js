import { createElement } from 'lwc';
import Songbuildermeasure from 'c/songbuildermeasure';
import SaveMusicNote from '@salesforce/apex/PianoController.SaveMusicNote';

const mockRecords = require("./data/recordMock.json");

jest.mock(
    "@salesforce/apex/PianoController.LoadMusicNote",
  
    () => ({
      default: jest.fn()
    }),
  
    { virtual: true }
  );

describe('c-songbuildermeasure', () => {
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

    it('Get Notes in Measure Test', () => {
        const element = document.querySelector('c-songbuilder');

        let buttonsList = element.shadowRoot.querySelectorAll("button");
        expect(buttonsList.length).toBe(8);

        buttonsList[6].click();
        buttonsList[6].click();
        let measureList = element.shadowRoot.querySelectorAll('c-c/songbuildermeasure');
        expect(measureList.length).toBe(2);

    });

    it('Save Notes in Measure Test', () => {
        const element = document.querySelector('c-songbuilder');

        let buttonsList = element.shadowRoot.querySelectorAll("button");
        expect(buttonsList.length).toBe(8);

        buttonsList[4].click();
        expect(buttonList.length).toBe(9);

    });
});