import { createElement } from "lwc";
import Metronome from "c/metronome";

describe("c-metronome", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("Test test", () => {
    const element = createElement("c-metronome", {
      is: Metronome
    });

    document.body.appendChild(element);

    //let testVar = element.bpm2ms(100);
    expect(null).toBe(null);
    expect(element.bpm).toEqual(100);
  });
});
