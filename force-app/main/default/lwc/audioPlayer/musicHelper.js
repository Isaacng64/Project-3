
// Utility class to smooth any particular API features out with the audioplayer and soundboard suite

function sharp2flat(name) {

    // Converts any note name to a flat notation (for example C# -> Db)
    // This is for means of referencing the sound file paths correctly, which are all stored as flats
    // They are all stored as flats because #'s in static resource URL wasn't working, and this solution took 5 minutes

    // All file path names in practice SHOULD BE CASE INSENSITIVE, but this also makes sure to capitalize exactly as the file names are, anyway

    if(name.toLowerCase() == "g#" || name.toLowerCase() == "ab"){ // special end case, all others work by incrementing next letter but can't increment G to A
        return 'Ab';
    }

    if(name.includes("#")){
        const base = name.charAt(0);
        return nextCharacter(base).toUpperCase() + 'b';
    }else{
        return name.length > 1 ? name.charAt(0).toUpperCase() + 'b' : name.charAt(0).toUpperCase(); // ternary operator so cool
    }
}

function nextCharacter(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1); // https://stackoverflow.com/questions/12504042/what-is-a-method-that-can-be-used-to-increment-letters
}


function offset2note(relOffset, octave, name){

    var baseOctave = Number(octave); // if base octave given, clean it, otherwise set to lowest octave 0
    if(! baseOctave){
        baseOctave = 0; 
    }

    let index; // note name -> (note name + relOffset) % 12 where notename + reloffset is the index
    if(name){ // if name is given as input, clean it
        name = sharp2flat(name); // clean name input
        index = indexOf(name) + relOffset;
    }else{
        index = relOffset;
    }

    let octOff = Math.trunc( index / 12.0 ); // (index + BASE_INDEX_PIANO)

    const totalOctave = octOff + baseOctave;

    const newNote = clampBounds(index2noteH(index), totalOctave);

    return {name: newNote, 
        octave: totalOctave};

}

let notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

//const BASE_INDEX_PIANO = 0; // means that everything is relative to C by default, the lowest in every octave per our files!!

function index2noteH(index){

    return notes[(index % 12)]; // (index + BASE_INDEX_PIANO)

}

function indexOf(name){

    return notes.indexOf(name); // notes.indexOf(name) - BASE_INDEX_PIANO;
    
}

function clampBounds(name, octave){
    // clamps piano key bounds because of our sound file extents
    /*
    if (octave == 0){
        if (notes.indexOf(name) < BASE_INDEX_PIANO){ // <3 lol
            return notes[BASE_INDEX_PIANO];
        }else{
            return name;
        }*/
    if(octave == 7){
        return "C";
    }else{
        return name;
    }
}

export { sharp2flat, offset2note }
