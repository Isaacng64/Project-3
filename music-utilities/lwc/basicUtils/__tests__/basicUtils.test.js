import { createElement } from 'lwc';
import basicUtils from 'c/basicUtils';

describe('c-basic-utils', () => {

  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }

  });

  it('Test setPitchMap Pos', () => {
    const element = createElement('c-basic-utils', {
      is: basicUtils
    });

    document.body.appendChild(element);
    element.setPitchMap(73, 'C');
    expect(element.pitchMap).toStrictEqual(['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B',
      'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B',
      'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B',
      'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B',
      'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B',
      'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B', 'C']);

  });

  it('Test setPitchMap Neg', () => {
    const element = createElement('c-basic-utils', {
      is: basicUtils
    });

    document.body.appendChild(element);
    element.setPitchMap(33, 'hdsdfh');
    expect(element.pitchMap).toStrictEqual([]);

  });

  it('Test getNoteFromPitch Positive', () => {
    const element = createElement('c-basic-utils', {
      is: basicUtils
    });

    document.body.appendChild(element);
    element.setPitchMap(73, 'C');
    expect(element.getNoteFromPitch(0)).toBe('C');
    expect(element.getNoteFromPitch(6)).toBe('Gb');
    expect(element.getNoteFromPitch(37)).toBe('Db');
    expect(element.getNoteFromPitch(72)).toBe('C');

  });

  it('Test getNoteFromPitch Negative', () => {
    const element = createElement('c-basic-utils', {
      is: basicUtils
    });

    document.body.appendChild(element);
    element.setPitchMap(73, 'C');
    expect(element.getNoteFromPitch(7807)).toBe(undefined);

  });

  it('Test getNotesFromPitches Positive', () => {
    const element = createElement('c-basic-utils', {
      is: basicUtils
    });

    document.body.appendChild(element);
    element.setPitchMap(73, 'C');
    expect(element.getNotesFromPitches([0, 3, 7])).toStrictEqual(['C', 'Eb', 'G']);

  });

  it('Test getNotesFromPitches Negative', () => {
    const element = createElement('c-basic-utils', {
      is: basicUtils
    });

    document.body.appendChild(element);
    element.setPitchMap(73, 'C');
    expect(element.getNotesFromPitches([800, 437, -18])).toStrictEqual([]);

  });

  it('Test getMajorTriad Positive', () => {
    const element = createElement('c-basic-utils', {
      is: basicUtils
    });

    document.body.appendChild(element);
    element.setPitchMap(73, 'C');
    let triad = element.getMajorTriad(0);
    expect(triad).toStrictEqual([0, 4, 7]);
    let triad2 = element.getMajorTriad(72);
    expect(triad2).toStrictEqual([64, 67, 72]);
    let triad3 = element.getMajorTriad(68);
    expect(triad3).toStrictEqual([63, 68, 72]);

  });

  it('Test getMajorTriad Negative', () => {
    const element = createElement('c-basic-utils', {
      is: basicUtils
    });

    document.body.appendChild(element);
    element.setPitchMap(73, 'C');
    let triad = element.getMajorTriad(74);
    expect(triad).toBe(null);

  });

  it('Test getMinorTriad Negative', () => {
    const element = createElement('c-basic-utils', {
      is: basicUtils
    });

    document.body.appendChild(element);
    element.setPitchMap(73, 'C');
    let triad = element.getMinorTriad(0);
    expect(triad).toStrictEqual([0, 3, 7]);
    let triad2 = element.getMinorTriad(69);
    expect(triad2).toStrictEqual([64, 69, 72]);
    let triad3 = element.getMinorTriad(72);
    expect(triad3).toStrictEqual([63, 67, 72]);

  });


  it('Test getMinorTriad Negative', () => {
    const element = createElement('c-basic-utils', {
      is: basicUtils
    });

    document.body.appendChild(element);
    element.setPitchMap(73, 'C');
    let triad = element.getMinorTriad(8000);
    expect(triad).toBe(null);

  });

  it('Test getDiminishedTriad Positive', () => {
    const element = createElement('c-basic-utils', {
      is: basicUtils
    });

    document.body.appendChild(element);
    element.setPitchMap(73, 'C');
    let triad = element.getDiminishedTriad(0);
    expect(triad).toStrictEqual([0, 3, 6]);
    let triad2 = element.getDiminishedTriad(69);
    expect(triad2).toStrictEqual([63, 69, 72]);
    let triad3 = element.getDiminishedTriad(72);
    expect(triad3).toStrictEqual([63, 66, 72])

  });

  it('Test getDiminishedTriad Negative', () => {
    const element = createElement('c-basic-utils', {
      is: basicUtils
    });

    document.body.appendChild(element);
    element.setPitchMap(73, 'C');
    let triad = element.getDiminishedTriad(8000);
    expect(triad).toBe(null);

  });

  it('Test setKeySignature', () => {
    const element = createElement('c-basic-utils', {
      is: basicUtils
    });

    document.body.appendChild(element);
    element.setPitchMap(73, 'C');
    element.setKeySignature('C');
    expect(element.keySignature[0]).toBe('C');
    expect(element.keySignaturePitches[0]).toBe(0);
    element.setKeySignature('E');
    expect(element.keySignature[0]).toBe('E');
    expect(element.keySignaturePitches.includes(4));

  });

  it('Test getValidChordInKey Positive', () => {
    const element = createElement('c-basic-utils', {
      is: basicUtils
    });

    document.body.appendChild(element);
    element.setPitchMap(73, 'C');
    element.setKeySignature('C');
    let chord = element.getValidChordInKey(0);
    expect(chord).toStrictEqual([0, 4, 7]);
    let chord2 = element.getValidChordInKey(2);
    expect(chord2).toStrictEqual([2, 5, 9]);
    let chord3 = element.getValidChordInKey(11);
    expect(chord3).toStrictEqual([11, 14, 17]);

  });

  it('Test getValidChordInKey Negative', () => {
    const element = createElement('c-basic-utils', {
      is: basicUtils
    });

    document.body.appendChild(element);
    element.setPitchMap(73, 'C');
    element.setKeySignature('C');
    let chord = element.getValidChordInKey(1);
    expect(chord).toBe(null);

  });

  it('Test convertToSharp Positive', () => {
    const element = createElement('c-basic-utils', {
      is: basicUtils
    });

    document.body.appendChild(element);
    element.setPitchMap(73, 'C');
    let converted = element.convertToSharp('Bb');
    expect(converted).toBe('A#');

  });

  it('Test convertToSharp Negative', () => {
    const element = createElement('c-basic-utils', {
      is: basicUtils
    });

    document.body.appendChild(element);
    element.setPitchMap(73, 'C');
    let converted = element.convertToSharp('Bhdgd');
    expect(converted).toBe(null);

  });

  it('Test convertToFlat Positive', () => {
    const element = createElement('c-basic-utils', {
      is: basicUtils
    });

    document.body.appendChild(element);
    element.setPitchMap(73, 'C');
    let converted = element.convertToFlat('G#');
    expect(converted).toBe('Ab');

  });

  it('Test convertToFlat Negative', () => {
    const element = createElement('c-basic-utils', {
      is: basicUtils
    });

    document.body.appendChild(element);
    element.setPitchMap(73, 'C');
    let converted = element.convertToFlat('A#');
    expect(converted).toBe("Bb");

  });

});