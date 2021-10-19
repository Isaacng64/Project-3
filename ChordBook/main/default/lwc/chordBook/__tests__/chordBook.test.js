import { createElement } from 'lwc';
import ChordBook from 'c/chordBook';

describe('c-chord-book', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    /* tests for ensuring variables get activated */ 
    test('ensures activateGuitar sets variables properly', () => {
        const element = createElement('c-chord-book', {
            is: ChordBook
        });
        document.body.appendChild(element);

        let activeGuitar = element.activateGuitar();

        expect(element.guitarActive).toBe(true);
    });
    test('ensures activateBass works properly', () => {
        const element = createElement('c-chord-book', {
            is: ChordBook
        });
        document.body.appendChild(element);

        let activeBass = element.activateBass();
        expect(element.bassActive).toBe(true);
    });
    test('ensures activatePiano works properly', () => {
        const element = createElement('c-chord-book', {
            is: ChordBook
        });
        document.body.appendChild(element);

        let activeBass = element.activatePiano();
        expect(element.pianoActive).toBe(true);
    });
    /* end of tests checking variable change */

    test('tests the renderedcallback lifecycle hook', () => {
        const element = createElement('c-chord-book', {
            is: ChordBook
        });

        document.body.appendChild(element);
        
        let imgs = this.template.querySelectorAll('img');
        expect(imgs[2].classList[0]).toBe('focus-on-me');
    });
    test('tests the left click function', () => {
        const element = createElement('c-chord-book', {
            is: ChordBook
        });

        document.body.appendChild(element);
        
        let fireButton = element.handleLeftClick();
        let imgs = this.template.querySelectorAll('img');
        expect(imgs[1].classList[0]).toBe('focus-on-me');
    });    
    test('tests the right click function', () => {
        const element = createElement('c-chord-book', {
            is: ChordBook
        });

        document.body.appendChild(element);
        
        let fireButton = element.handleRightClick();
        let imgs = this.template.querySelectorAll('img');
        expect(imgs[3].classList[0]).toBe('focus-on-me');
    });
});