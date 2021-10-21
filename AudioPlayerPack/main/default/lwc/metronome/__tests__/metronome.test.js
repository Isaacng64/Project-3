import { createElement } from "lwc";
import Metronome from "c/metronome";

describe("c-metronome", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("Start and Stop Test", () => {
    const element = createElement("c-metronome", {
      is: Metronome
    });

    document.body.appendChild(element);

    const tickReceived = jest.fn();
    element.addEventListener("tick", tickReceived);
    const subTickReceived = jest.fn();
    element.addEventListener("subtick", subTickReceived);

    jest.useFakeTimers();

    expect(tickReceived).toBeCalledTimes(0);
    let buttonsList = element.shadowRoot.querySelectorAll("button");
    expect(buttonsList.length).toBe(9);

    buttonsList[0].click();
    expect(tickReceived).toBeCalledTimes(0);
    expect(subTickReceived).toBeCalledTimes(0);
    jest.runOnlyPendingTimers();
    expect(tickReceived).toBeCalledTimes(1);
    expect(subTickReceived).toBeCalledTimes(1);
    jest.runOnlyPendingTimers();
    expect(tickReceived).toBeCalledTimes(1);
    expect(subTickReceived).toBeCalledTimes(2);

    buttonsList[1].click();
    jest.runOnlyPendingTimers();
    expect(tickReceived).toBeCalledTimes(1);
    expect(subTickReceived).toBeCalledTimes(2);
  });

  it("Tick and Subtick Test", () => {
    const element = createElement("c-metronome", {
      is: Metronome
    });

    document.body.appendChild(element);

    const tickReceived = jest.fn();
    element.addEventListener("tick", tickReceived);
    const subTickReceived = jest.fn();
    element.addEventListener("subtick", subTickReceived);

    jest.useFakeTimers();

    expect(tickReceived).toBeCalledTimes(0);
    let buttonsList = element.shadowRoot.querySelectorAll("button");
    expect(buttonsList.length).toBe(9);

    buttonsList[0].click();
    expect(tickReceived).toBeCalledTimes(0);
    expect(subTickReceived).toBeCalledTimes(0);
    jest.runOnlyPendingTimers();
    expect(tickReceived).toBeCalledTimes(1);
    expect(subTickReceived).toBeCalledTimes(1);
    jest.runOnlyPendingTimers();
    expect(tickReceived).toBeCalledTimes(1);
    expect(subTickReceived).toBeCalledTimes(2);
    jest.runOnlyPendingTimers();
    expect(tickReceived).toBeCalledTimes(1);
    expect(subTickReceived).toBeCalledTimes(3);
    jest.runOnlyPendingTimers();
    expect(tickReceived).toBeCalledTimes(1);
    expect(subTickReceived).toBeCalledTimes(4);
    jest.runOnlyPendingTimers();
    expect(tickReceived).toBeCalledTimes(2);
    expect(subTickReceived).toBeCalledTimes(5);
  });

  it("Mute Text Test", () => {
    const element = createElement("c-metronome", {
      is: Metronome
    });

    document.body.appendChild(element);

    let buttonsList = element.shadowRoot.querySelectorAll("button");
    expect(buttonsList.length).toBe(9);

    expect(buttonsList[2].textContent).toBe("Mute");
    buttonsList[2].click();
    return Promise.resolve().then(() => {
      expect(buttonsList[2].textContent).toBe("Unmute");
      buttonsList[2].click();
      return Promise.resolve().then(() => {
        expect(buttonsList[2].textContent).toBe("Mute");
      });
    });
  });

  it("Default Speed Test", () => {
    const element = createElement("c-metronome", {
      is: Metronome
    });

    document.body.appendChild(element);

    const subTickReceived = jest.fn();
    element.addEventListener("subtick", subTickReceived);

    jest.useFakeTimers();

    expect(subTickReceived).toBeCalledTimes(0);
    let buttonsList = element.shadowRoot.querySelectorAll("button");
    expect(buttonsList.length).toBe(9);
    let currentBpm = 160;

    buttonsList[0].click();
    jest.runOnlyPendingTimers();
    expect(subTickReceived).toBeCalledTimes(1);
    for (let i = 2; i < 10; i++) {
      jest.advanceTimersByTime((1000 * 60) / (currentBpm * 4));
      expect(subTickReceived).toBeCalledTimes(i);
    }
  });

  it("Faster 1 Test", () => {
    const element = createElement("c-metronome", {
      is: Metronome
    });

    document.body.appendChild(element);

    const subTickReceived = jest.fn();
    element.addEventListener("subtick", subTickReceived);

    jest.useFakeTimers();

    expect(subTickReceived).toBeCalledTimes(0);
    let buttonsList = element.shadowRoot.querySelectorAll("button");
    expect(buttonsList.length).toBe(9);
    let currentBpm = 160;

    for (let i = 0; i < 40; i++) {
      buttonsList[5].click();
      currentBpm++;
    }

    buttonsList[0].click();
    jest.runOnlyPendingTimers();
    expect(subTickReceived).toBeCalledTimes(1);
    for (let i = 2; i < 10; i++) {
      jest.advanceTimersByTime((1000 * 60) / (currentBpm * 4));
      expect(subTickReceived).toBeCalledTimes(i);
    }
  });

  it("Faster 10 Test", () => {
    const element = createElement("c-metronome", {
      is: Metronome
    });

    document.body.appendChild(element);

    const subTickReceived = jest.fn();
    element.addEventListener("subtick", subTickReceived);

    jest.useFakeTimers();

    expect(subTickReceived).toBeCalledTimes(0);
    let buttonsList = element.shadowRoot.querySelectorAll("button");
    expect(buttonsList.length).toBe(9);
    let currentBpm = 160;

    for (let i = 0; i < 40; i++) {
      buttonsList[6].click();
      currentBpm += 10;
    }

    buttonsList[0].click();
    jest.runOnlyPendingTimers();
    expect(subTickReceived).toBeCalledTimes(1);
    for (let i = 2; i < 10; i++) {
      jest.advanceTimersByTime((1000 * 60) / (currentBpm * 4));
      expect(subTickReceived).toBeCalledTimes(i);
    }
  });

  it("Slower 1 Test", () => {
    const element = createElement("c-metronome", {
      is: Metronome
    });

    document.body.appendChild(element);

    const subTickReceived = jest.fn();
    element.addEventListener("subtick", subTickReceived);

    jest.useFakeTimers();

    expect(subTickReceived).toBeCalledTimes(0);
    let buttonsList = element.shadowRoot.querySelectorAll("button");
    expect(buttonsList.length).toBe(9);
    let currentBpm = 160;

    for (let i = 0; i < 40; i++) {
      buttonsList[4].click();
      currentBpm--;
    }

    buttonsList[0].click();
    jest.runOnlyPendingTimers();
    expect(subTickReceived).toBeCalledTimes(1);
    for (let i = 2; i < 10; i++) {
      jest.advanceTimersByTime((1000 * 60) / (currentBpm * 4));
      expect(subTickReceived).toBeCalledTimes(i);
    }
  });

  it("Slower 10 Test", () => {
    const element = createElement("c-metronome", {
      is: Metronome
    });

    document.body.appendChild(element);

    const subTickReceived = jest.fn();
    element.addEventListener("subtick", subTickReceived);

    jest.useFakeTimers();

    expect(subTickReceived).toBeCalledTimes(0);
    let buttonsList = element.shadowRoot.querySelectorAll("button");
    expect(buttonsList.length).toBe(9);
    let currentBpm = 160;

    for (let i = 0; i < 10; i++) {
      buttonsList[3].click();
      currentBpm -= 10;
    }

    buttonsList[0].click();
    jest.runOnlyPendingTimers();
    expect(subTickReceived).toBeCalledTimes(1);
    for (let i = 2; i < 10; i++) {
      jest.advanceTimersByTime((1000 * 60) / (currentBpm * 4));
      expect(subTickReceived).toBeCalledTimes(i);
    }
  });

  it("counterMaxLocked Test", () => {
    const element = createElement("c-metronome", {
      is: Metronome
    });

    element.counterMaxLocked = true;
    document.body.appendChild(element);

    let buttonsList = element.shadowRoot.querySelectorAll("button");
    expect(buttonsList.length).toBe(7);
  });

  it("More Beats Test", () => {
    const element = createElement("c-metronome", {
      is: Metronome
    });

    document.body.appendChild(element);

    let buttonsList = element.shadowRoot.querySelectorAll("button");
    expect(buttonsList.length).toBe(9);

    let divsList = element.shadowRoot
      .querySelector("c-beat-pattern-ui")
      .shadowRoot.querySelectorAll("div");
    expect(divsList.length).toBe(9);

    buttonsList[8].click();
    return Promise.resolve().then(() => {
      divsList = element.shadowRoot
        .querySelector("c-beat-pattern-ui")
        .shadowRoot.querySelectorAll("div");
      expect(divsList.length).toBe(11);
    });
  });

  it("Less Beats Test", () => {
    const element = createElement("c-metronome", {
      is: Metronome
    });

    document.body.appendChild(element);

    let buttonsList = element.shadowRoot.querySelectorAll("button");
    expect(buttonsList.length).toBe(9);

    let divsList = element.shadowRoot
      .querySelector("c-beat-pattern-ui")
      .shadowRoot.querySelectorAll("div");
    expect(divsList.length).toBe(9);

    buttonsList[7].click();
    return Promise.resolve().then(() => {
      divsList = element.shadowRoot
        .querySelector("c-beat-pattern-ui")
        .shadowRoot.querySelectorAll("div");
      expect(divsList.length).toBe(7);
    });
  });

  it("Highlight Beats Test", () => {
    const element = createElement("c-metronome", {
      is: Metronome
    });

    document.body.appendChild(element);

    jest.useFakeTimers();

    const tickReceived = jest.fn();
    element.addEventListener("tick", tickReceived);

    let buttonsList = element.shadowRoot.querySelectorAll("button");
    expect(buttonsList.length).toBe(9);

    let divsList = element.shadowRoot
      .querySelector("c-beat-pattern-ui")
      .shadowRoot.querySelectorAll("div");
    expect(divsList.length).toBe(9);
    expect(divsList[2].className).toBe("inner unhighlighted");

    buttonsList[0].click();
    expect(tickReceived).toBeCalledTimes(0);
    jest.runOnlyPendingTimers();
    expect(tickReceived).toBeCalledTimes(1);

    expect(divsList[2].className).toBe("inner highlighted");

    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    expect(tickReceived).toBeCalledTimes(2);

    expect(divsList[2].className).toBe("inner unhighlighted");
  });

  it("Mute Volume Test", () => {
    const element = createElement("c-metronome", {
      is: Metronome
    });

    document.body.appendChild(element);

    jest.useFakeTimers();

    const tickReceived = jest.fn();
    element.addEventListener("tick", tickReceived);

    let buttonsList = element.shadowRoot.querySelectorAll("button");
    expect(buttonsList.length).toBe(9);

    buttonsList[0].click();
    expect(tickReceived).toBeCalledTimes(0);
    jest.runOnlyPendingTimers();
    expect(tickReceived).toBeCalledTimes(1);
    expect(tickReceived.mock.calls[0][0].detail).toBe(0.25);

    buttonsList[2].click();
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    expect(tickReceived).toBeCalledTimes(2);
    expect(tickReceived.mock.calls[1][0].detail).toBe(0);

    buttonsList[2].click();
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    expect(tickReceived).toBeCalledTimes(3);
    expect(tickReceived.mock.calls[2][0].detail).toBe(0.25);
  });
});
