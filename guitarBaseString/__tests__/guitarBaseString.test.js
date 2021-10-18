import { createElement } from 'lwc';
import GuitarBaseString from 'c/guitarBaseString';

describe('c-guitar-base-string', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    test('Testing setFretInString() Function', () => {
        const testSetFretInString = createElement('c-guitar-base-string', {is: GuitarBaseString});
        document.body.appendChild(testSetFretInString);



        const FIS = jest.fn();
        testSetFretInString.addEventListener("setFretInString", FIS);
        expect(FIS.mock.calls[1][0].detail).toBe(0);
    });

    test('Testing strum() Function', () => {
        const testStrum = createElement('c-guitar-base-string', {is: GuitarBaseString});
        document.body.appendChild(testStrum);

        const tStrum = jest.fn();
        testStrum.addEventListener("strum", tStrum);
        expect(tStrum.mock.calls[0][0]).toBe(0);
    });

    test('Testing handlePressed(event) Function', () => {
        const testHandlePressed = createElement('c-guitar-base-string', {is: GuitarBaseString});
        document.body.appendChild(testHandlePressed);

        const tHandlePressed = jest.fn();
        testHandlePressed.addEventListener("handlePressed", tHandlePressed);
        expect(1).toBe(0);
    });
});