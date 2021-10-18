import { createElement } from 'lwc';
import PianoFitOctaves from 'c/pianoFitOctaves';

describe('c-piano-fit-octaves', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Test Pos AddOctave', () => {
        const element = createElement('c-piano-fit-octaves', {
            is: PianoFitOctaves
        });

        document.body.appendChild(element);
        element.addOctave();
        expect(element.numOctave).toBe(3);
        expect(element.octaveZero).toBe(1);
        expect(element.octaveOne).toBe(2);
        expect(element.octaveTwo).toBe(3);
        expect(element.firstKey).toBe(12);
        expect(element.lastKey).toBe(48);
    });

    it('Test Bulk AddOctave', () => {
        const element = createElement('c-piano-fit-octaves', {
            is: PianoFitOctaves
        });

        document.body.appendChild(element);
        element.addOctave();
        element.addOctave();
        element.addOctave();

        expect(element.numOctave).toBe(5);
        expect(element.octaveZero).toBe(3);
        expect(element.octaveOne).toBe(4);
        expect(element.octaveTwo).toBe(5);
        expect(element.firstKey).toBe(36);
        expect(element.lastKey).toBe(72);
    });

    it('Test Neg AddOctave', () => {
        const element = createElement('c-piano-fit-octaves', {
            is: PianoFitOctaves
        });

        document.body.appendChild(element);
        /* 
            Test to insure the addOctave will not go pass the limits, ass such this will test to see if using 
            addOctave to move the visable octaves from 0-2 to 11-13 will fail only showing the max of 5-7 
        */
        element.addOctave();
        element.addOctave();
        element.addOctave();
        element.addOctave();
        element.addOctave();
        element.addOctave();
        element.addOctave();
        element.addOctave();
        element.addOctave();
        element.addOctave();
        element.addOctave();

        expect(element.numOctave).toBe(7);
        expect(element.octaveZero).toBe(5);
        expect(element.octaveOne).toBe(6);
        expect(element.octaveTwo).toBe(7);
        expect(element.firstKey).toBe(60);
        expect(element.lastKey).toBe(96);
    });

    it('Test Pos decreaseOctave', () => {
        const element = createElement('c-piano-fit-octaves', {
            is: PianoFitOctaves
        });

        document.body.appendChild(element);
        element.addOctave();
        element.addOctave();
        element.addOctave();
        /* moves the displayed octaves from 0-2 to 3-5 */
        /* now the visable octave should be from 2-4 */
        element.decreaseOctave();
        expect(element.numOctave).toBe(4);
        expect(element.octaveZero).toBe(2);
        expect(element.octaveOne).toBe(3);
        expect(element.octaveTwo).toBe(4);
        expect(element.firstKey).toBe(24);
        expect(element.lastKey).toBe(60);
    });

    it('Test Bulk decreaseOctave', () => {
        const element = createElement('c-piano-fit-octaves', {
            is: PianoFitOctaves
        });

        document.body.appendChild(element);
        element.addOctave();
        element.addOctave();
        element.addOctave();
        /* moves the displayed octaves from 0-2 to 3-5 */
        /* now the visable octave should go back to 0-2 */
        element.decreaseOctave();
        element.decreaseOctave();
        element.decreaseOctave();
        expect(element.numOctave).toBe(2);
        expect(element.octaveZero).toBe(0);
        expect(element.octaveOne).toBe(1);
        expect(element.octaveTwo).toBe(2);
        expect(element.firstKey).toBe(0);
        expect(element.lastKey).toBe(36);
    });

    it('Test Neg decreaseOctave', () => {
        const element = createElement('c-piano-fit-octaves', {
            is: PianoFitOctaves
        });
        /* 
            Test to insure the decreaseOctave will not go pass the limits, ass such this will test to see if using 
            decreaseOctave to move the visable octaves from 0-2 to -1-1 will fail only showing the min of 0-2 
        */
        document.body.appendChild(element);

        element.decreaseOctave();
        expect(element.numOctave).toBe(2);
        expect(element.octaveZero).toBe(0);
        expect(element.octaveOne).toBe(1);
        expect(element.octaveTwo).toBe(2);
        expect(element.firstKey).toBe(0);
        expect(element.lastKey).toBe(36);
    });    

    /*
    Unsure how to properly test this function, each iteration of tests resulted in TypeError: Cannot read property 'name' of undefined 

    it('Test handleKeyClickCE', () => {
        const element = createElement('c-piano-fit-octaves', {
            is: PianoFitOctaves
        });

        document.body.appendChild(element);
    });  
    */

});