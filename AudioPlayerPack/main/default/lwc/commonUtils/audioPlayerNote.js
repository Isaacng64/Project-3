import { sharp2flat, offset2note, stdNote2components } from "./musicHelper";

/*
 * This class is what you construct objects of to be passed to the actual audioPlayer instance to be played. Objects of this represent
 * individual notes to be played, and that is it. For example, 'C3' or 'Db4', but because of our sound files etc we need a way to
 * represent that information in a usable way. Also, this allows construction of the note in a few different manners as well,
 * notably by providing the offset to a base integer suitable for thinking about frets on a guitar.
 */

/*
 * Construction of a note with offset ABOVE THE ACTUAL INSTRUMENT RANGE will cap the note to the highest pitch on the piano
 */

export class AudioPlayerNote {
  name;

  octave;

  valid = false;

  constructor(offset_integer, name_string, octave_integer, std_note_string) {
    if (std_note_string) {
      let obj = stdNote2components(std_note_string);

      this.name = obj.name;
      this.octave = obj.octave;
    } else if (name_string) {
      this.name = name_string;
      this.octave = octave_integer ? Number(octave_integer) : 0;
    } else {
      console.log("no fundamental note specified, only offset (OK!)");
    }

    if (offset_integer != null) {
      let result = offset2note(offset_integer, this.octave, this.name);

      this.octave = result["octave"];
      this.name = result["name"];
    }

    this.name = sharp2flat(this.name);

    if ((this.name && this.octave) || (this.name && this.octave === 0)) {
      console.log("constructed note successfuly");
      this.valid = true;
    } else {
      throw "Could not construct note!";
    }
  }
}
