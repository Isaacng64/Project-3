import { createElement } from "lwc";
import CommonUtils from "c/commonUtils";
import { sharp2flat, stdNote2components } from "c/commonUtils";
import { AudioPlayerNote } from "../audioPlayerNote";

describe("c-common-utils", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("Test Note construction with only integer provided", () => {
    const element = createElement("c-common-utils", {
      is: CommonUtils
    });
    document.body.appendChild(element);

    /* When this passes it means that the note construction is good with just offset, but can be possible to construct notes BEYOND the range of the piano which is fine just don't do it */
    for (let i = 0; i < 110; i++) {
      let a = new AudioPlayerNote(i);
      expect(a.valid).toBe(true);
    }
  });

  it("Test Note construction piano BOUNDARIES", () => {
    let a = new AudioPlayerNote(0);
    expect(a.name).toBe("C");
    expect(a.octave).toBe(0);

    let b = new AudioPlayerNote(84);
    expect(b.name).toBe("C");
    expect(b.octave).toBe(7);

    let c = new AudioPlayerNote(85);
    expect(c.name).toBe("C");
    expect(c.octave).toBe(7);
  });

  it("Test Note construction with std notes provided", () => {
    let a = new AudioPlayerNote(0, null, null, "A3");
    expect(a.name).toBe("A");
    expect(a.octave).toBe(3);

    let b = new AudioPlayerNote(0, null, null, "Db3");
    expect(b.name).toBe("Db");
    expect(b.octave).toBe(3);

    let c = new AudioPlayerNote(0, null, null, "C#5");
    expect(c.name).toBe("Db");
    expect(c.octave).toBe(5);

    let d = new AudioPlayerNote(0, null, null, "F#6");
    expect(d.name).toBe("Gb");
    expect(d.octave).toBe(6);
  });

  it("Test Note construction with std notes provided AND OFFSET", () => {
    let a = new AudioPlayerNote(2, null, null, "A3");
    expect(a.name).toBe("B");
    expect(a.octave).toBe(3);

    let b = new AudioPlayerNote(1, null, null, "Db3");
    expect(b.name).toBe("D");
    expect(b.octave).toBe(3);

    let c = new AudioPlayerNote(1, null, null, "C#5");
    expect(c.name).toBe("D");
    expect(c.octave).toBe(5);

    let d = new AudioPlayerNote(12, null, null, "F#5");
    expect(d.name).toBe("Gb");
    expect(d.octave).toBe(6);

    let e = new AudioPlayerNote(25, null, null, "C4");
    expect(e.name).toBe("Db");
    expect(e.octave).toBe(6);
  });

  it("Test Note construction with components", () => {
    let a = new AudioPlayerNote(0, "C#", 4);
    expect(a.name).toBe("Db");
    expect(a.octave).toBe(4);

    let b = new AudioPlayerNote(13, "G", 3);
    expect(b.name).toBe("Ab");
    expect(b.octave).toBe(4);
  });


  it('Test sharp2flat with all the sharps', () => {
    let sharps = ["C#", "D#", "F#", "G#", "A#"];
    sharps.forEach((sharp) => {
      let result = sharp2flat(sharp);
      expect(result.charAt(1)).toBe('b');
    });

    let corner1 = "C#";
    let corner2 = "A#";

    let result1 = sharp2flat(corner1);
    let result2 = sharp2flat(corner2);

    expect(result1).toBe("Db");
    expect(result2).toBe("Bb");
    
  });

  it('Test stdNote2components', () => {
    let notes = ["C5", "D6", "F7", "G3", "A0"];

    notes.forEach((note) => {
      let result = stdNote2components(note);
      expect(result.octave).toBe(note.charAt(1));
      expect(result.name).toBe(note.charAt(0));
    });

  });

  it('Test stdNote2components with sharps', () => {
    /* This function itself does not clean inputs from sharp to flat, but that IS DONE in the AudioPlayerNote constructor */
    let notes = ["Ab0", "A#0", "F#5", "G#6"];
    let resultsNames = ["Ab", "A#", "F#", "G#"];

    for(let i = 0; i < notes.length; i++){
      let result = stdNote2components(notes[i]);
      expect(result.octave).toBe(notes[i].charAt(2));
      expect(result.name).toBe(resultsNames[i]);
    }
  });


});
