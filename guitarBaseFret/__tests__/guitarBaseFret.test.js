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

  const tSetFret = jest.fn();
  testSetFret.addEventListener("setFret", tSetFret);
  expect(tSetFret.mock.calls[1][1]).toBe(true);
  expect(tSetFret.mock.calls[0][0]).toBe(false);
  });
});