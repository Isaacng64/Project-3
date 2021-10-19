import { createElement } from 'lwc';
import GuitarBaseInstrument from 'c/guitarBaseInstrument';

describe('c-guitar-base-instrument', () => {
  afterEach(() => {
  // The jsdom instance is shared across test cases in a single file so reset the DOM
  while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild);
    }
  });

it('Testing Fret and String', () => {
  const testFretAndString = createElement('c-guitar-base-instrument', {is: GuitarBaseInstrument});

  document.body.appendChild(testFretAndString);

  /*testFretAndString.currentFretAndString();
  expect(testFretAndString.currentFret).toBe(0);
  expect(testFretAndString.stringNumber).toBe(1);*/

  const fretString = jest.fn();
  testFretAndString.addEventListener("currentFretAndString", fretString);
  expect(fretString.mock.calls[0][0].detail).toBe(0);
  expect(fretString.mock.calls[0][1].detail).toBe(1);
  });

it('Testing Base notes', () => {
  const testPlayBass = createElement('c-guitar-base-instrument', {is: GuitarBaseInstrument});

  document.body.appendChild(testPlayBass);

  const fretString = jest.fn();
  testPlayBass.addEventListener("playBass", fretString);
  expect(fretString.mock.calls[0][0].detail).toBe(0);
  expect(fretString.mock.calls[0][1].detail).toBe(1);
  });
});


