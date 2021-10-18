import { createElement } from 'lwc';
import GuitarBaseFret from 'c/guitarBaseFret';

describe('c-guitar-base-fret', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    test('Testing for ', () => {
        const testSetFret = createElement('c-guitar-base-fret', { is: GuitarBaseFret}); 

        document.body.appendChild(testSetFret);

        let testEvent = testSetFret.setFret();

        expect(testEvent).toBe(true);
    });
});