
// Utility class to smooth any particular API features out with the audioplayer and soundboard suite

function sharp2flat(name) {

    // Converts any note name to a flat notation (for example C# -> Db)
    // This is for means of referencing the sound file paths correctly, which are all stored as flats
    // They are all stored as flats because #'s in static resource URL wasn't working, and this solution took 5 minutes

    // All file path names in practice SHOULD BE CASE INSENSITIVE, but this also makes sure to capitalize exactly as the file names are, anyway

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


function offset2note(index){

    return offset2noteH(index);

}

function offset2noteH(index){
    switch((index + 3) % 12){
        // with index + 3 this is C INDEXED, with + 0 is A INDEXED
        case 0: return 'A';
        case 1: return 'Bb';
        case 2: return 'B';
        case 3: return 'C';
        case 4: return 'Db';
        case 5: return 'D';
        case 6: return 'Eb';
        case 7: return 'E';
        case 8: return 'F';
        case 9: return 'Gb';
        case 10: return 'G';
        case 11: return 'Ab';
    }
}

export { sharp2flat, offset2note }