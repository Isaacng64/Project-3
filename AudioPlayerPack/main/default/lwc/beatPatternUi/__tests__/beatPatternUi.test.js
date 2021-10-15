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

  it("setBeatsTotal Single Test", () => {
    const element = createElement("c-beat-pattern-ui", {
      is: BeatPatternUi
    });
    document.body.appendChild(element);

    let listVar = [0.25, 0.25, 0.25, 0.25];
    expect(element.getTempList()).toEqual(listVar);
    element.setBeatsTotal(1);

    expect(element.getBeatsTotal()).toBe(1);
    expect(element.getTempList().length).toBe(1);
    listVar = [0.25];
    expect(element.getTempList()).toStrictEqual(listVar);
  });

  it("setBeatsTotal Zero Test", () => {
    const element = createElement("c-beat-pattern-ui", {
      is: BeatPatternUi
    });
    document.body.appendChild(element);

    let listVar = [0.25, 0.25, 0.25, 0.25];
    expect(element.getTempList()).toEqual(listVar);
    element.setBeatsTotal(0);

    expect(element.getBeatsTotal()).toBe(0);
    expect(element.getTempList().length).toBe(0);
    listVar = [];
    expect(element.getTempList()).toStrictEqual(listVar);
  });

  it("setBeatsTotal Invalid Input Test", () => {
    const element = createElement("c-beat-pattern-ui", {
      is: BeatPatternUi
    });
    document.body.appendChild(element);

    let listVar = [0.25, 0.25, 0.25, 0.25];
    expect(element.getTempList()).toEqual(listVar);
    element.setBeatsTotal("not a number");

    expect(element.getBeatsTotal()).toBe("not a number");
    expect(element.getTempList().length).toBe(0);

    expect(element.getTempList()).toStrictEqual([]);
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

  it("highlightBeat Positive Test", () => {
    const element = createElement("c-beat-pattern-ui", {
      is: BeatPatternUi
    });
    document.body.appendChild(element);
    let divsList = element.shadowRoot.querySelectorAll("div");
    expect(divsList.length).toBe(9);
    expect(divsList[2].className).toBe("inner unhighlighted");

    element.highlightBeat(0);

    expect(divsList[2].className).toBe("inner highlighted");

    element.highlightBeat(1);

    expect(divsList[2].className).toBe("inner unhighlighted");
    expect(divsList[4].className).toBe("inner highlighted");
  });

  it("highlightBeat Negative Test", () => {
    const element = createElement("c-beat-pattern-ui", {
      is: BeatPatternUi
    });
    document.body.appendChild(element);
    let divsList = element.shadowRoot.querySelectorAll("div");
    expect(divsList.length).toBe(9);
    expect(divsList[4].className).toBe("inner unhighlighted");

    element.highlightBeat(0);
    expect(divsList[2].className).toBe("inner highlighted");

    element.highlightBeat(10);

    expect(divsList[2].className).toBe("inner unhighlighted");
    expect(divsList[4].className).toBe("inner unhighlighted");
    expect(divsList[6].className).toBe("inner unhighlighted");
    expect(divsList[8].className).toBe("inner unhighlighted");
  });

  it("highlightBeat 8 Beats Test", () => {
    const element = createElement("c-beat-pattern-ui", {
      is: BeatPatternUi
    });
    document.body.appendChild(element);

    element.setBeatsTotal(8);
    expect(element.getBeatsTotal()).toBe(8);
    expect(element.getTempList().length).toBe(8);

    let divsList = element.shadowRoot.querySelectorAll("div");
    expect(divsList.length).toBe(17);
    expect(divsList[2].className).toBe("inner unhighlighted");

    element.highlightBeat(0);

    expect(divsList[2].className).toBe("inner highlighted");

    element.highlightBeat(1);

    expect(divsList[2].className).toBe("inner unhighlighted");
    expect(divsList[4].className).toBe("inner highlighted");

    element.highlightBeat(8);

    expect(divsList[4].className).toBe("inner unhighlighted");
    expect(divsList[16].className).toBe("inner highlighted");
  });
});
