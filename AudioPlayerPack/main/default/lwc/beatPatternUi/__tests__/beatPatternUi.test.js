import { createElement } from "lwc";
import BeatPatternUi from "c/beatPatternUi";

describe("c-beat-pattern-ui", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("setBeatsTotal Bulk Test", () => {
    const element = createElement("c-beat-pattern-ui", {
      is: BeatPatternUi
    });
    document.body.appendChild(element);

    let listVar = [0.25, 0.25, 0.25, 0.25];
    expect(element.getTempList()).toEqual(listVar);
    element.setBeatsTotal(1000);

    expect(element.getBeatsTotal()).toBe(1000);
    expect(element.getTempList().length).toBe(1000);
    for (let i = 4; i < 1000; i++) {
      listVar.push(0.25);
    }
    expect(element.getTempList()).toStrictEqual(listVar);
  });

  it("clickVolumeHandler Test", () => {
    const element = createElement("c-beat-pattern-ui", {
      is: BeatPatternUi
    });
    document.body.appendChild(element);

    let listVar = [0.25, 0.25, 0.25, 0.25];
    expect(element.getTempList()).toEqual(listVar);

    let divsList = element.shadowRoot.querySelectorAll("div");
    let buttonsList = [];
    for (let i = 1; i < divsList.length; i = i + 2) {
      buttonsList.push(divsList[i]);
    }
    for (let i = 0; i < divsList.length; i++) {
      try {
        /*let testEvent = new CustomEvent();
                testEvent.target = divsList[i];
                divsList[i].dispatchEvent(testEvent);*/

        divsList[i].click();
        expect(1).toBe(2);
      } catch (error) {
        console.log(i);
      }
    }
    //divsList[3].click();

    listVar[0] = 0.5;
    //expect(element.getTempList()).toStrictEqual(listVar);
  });

  it("highlightBeat Test", () => {
    const element = createElement("c-beat-pattern-ui", {
      is: BeatPatternUi
    });
    document.body.appendChild(element);
    let divsList = element.shadowRoot.querySelectorAll("div");
    expect(divsList.length).toBe(9);
    expect(divsList[4].className).toBe("inner");

    element.highlightBeat(1);

    expect(divsList[4].className).toBe("inner highlighted");

    element.highlightBeat(2);

    expect(divsList[4].className).toBe("inner unhighlighted");
    expect(divsList[6].className).toBe("inner highlighted");
  });
});
