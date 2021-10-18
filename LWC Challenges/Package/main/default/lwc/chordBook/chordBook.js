import { LightningElement, track } from 'lwc';

export default class App extends LightningElement {
/* Initializes the templates for each instrument to not display by default */
  guitarActive  = true;
  bassActive    = false;
  pianoActive   = false;

  /* variable to toggle the extra info */
  showTheThing  = false;
  secondKey     = false;
  thirdKey      = false;
  noKey         = false;
  toggleClick   = false;

  /* variables to dynamically update extra info about chords */
  @track
  firstChordInfo;
  @track
  firstKeyPositionInfo;
  @track
  firstOtherChordsSameKey;
  @track
  secondChordInfo; 
  @track
  secondKeyPositionInfo;
  @track
  secondOtherChordsSameKey;
  @track
  thirdChordInfo;
  @track
  thirdKeyPositionInfor;
  @track
  thirdOtherChordsSameKey;

/* Functions changing what the active instrument is, and deactivating inactive ones */
/* Maybe in the future there could be a drop down list of chord books for the user to pick from? 
   In this iteration though we were just told to have it be resopnsive so it's just responsive for now*/
  activateGuitar(/*something passed in from parent*/){
    guitarActive  = true;
    bassActive    = false;
    pianoActive   = false;
  }

  activateBass(/*something passed in from parent*/){
  guitarActive  = false;
  bassActive    = true;
  pianoActive   = false;
  }
    
  activatePiano(/*something passed in from parent*/){
    guitarActive  = false;
    bassActive    = false;
    pianoActive   = true;
  }
/* End of instruments function */

/* function to handle the click functinality to dislay more information about the chords*/
  handleBlurb(event){
    this.toggleClick = !this.toggleClick;
    let div = event.target.alt;
    if(this.guitarActive==true){
      for (let i=0; i<this.guitarChords.length; i++)
      {
        if(this.guitarChords[i].alt == div){
          if(this.guitarChords[i].firstKey == null){
            this.noKey = true;
            this.showTheThing = false;
          }else{
            this.noKey = false;
            this.showTheThing = true;
            this.firstChordInfo = this.guitarChords[i].firstKey;
            this.firstKeyPositionInfo = this.guitarChords[i].firstKeyPosition;
            this.firstOtherChordsSameKey = this.guitarChords[i].firstKeyOtherChords;
            if(this.guitarChords[i].secondKey != null){
              this.secondKey = true;
              this.secondChordInfo = this.guitarChords[i].secondKey;
              this.secondKeyPositionInfo = this.guitarChords[i].secondKeyPosition;
              this.secondOtherChordsSameKey = this.guitarChords[i].secondKeyOtherChords;
              if(this.guitarChords[i].thirdKey != null){
                this.thirdKey = true;
                this.thirdChordInfo = this.guitarChords[i].thirdKey;
                this.thirdKeyPositionInfor = this.guitarChords[i].thirdKeyPosition;
                this.thirdOtherChordsSameKey = this.guitarChords[i].thirdKeyOtherChords;
              }else{
                this.thirdKey = false;
              }
            }else{
              this.secondKey = false;
            }
            
          }
        }
      } 
   }
   else if (this.bassActive==true){
     console.log("Help");
    for (let i=0; i<this.bassChords.length; i++)
    {
      if(this.bassChords[i].alt == div){
        if(this.bassChords[i].firstKey == null){
          this.noKey = true;
          this.showTheThing = false;
        }else{
          console.log("hi");
          this.noKey = false;
          this.showTheThing = true;
          this.firstChordInfo = this.bassChords[i].firstKey;
          this.firstKeyPositionInfo = this.bassChords[i].firstKeyPosition;
          this.firstOtherChordsSameKey = this.bassChords[i].firstKeyOtherChords;
          if(this.bassChords[i].secondKey != null){
            this.secondKey = true;
            this.secondChordInfo = this.bassChords[i].secondKey;
            this.secondKeyPositionInfo = this.bassChords[i].secondKeyPosition;
            this.secondOtherChordsSameKey = this.bassChords[i].secondKeyOtherChords;
            if(this.bassChords[i].thirdKey != null){
              this.thirdKey = true;
              this.thirdChordInfo = this.bassChords[i].thirdKey;
              this.thirdKeyPositionInfor = this.bassChords[i].thirdKeyPosition;
              this.thirdOtherChordsSameKey = this.bassChords[i].thirdKeyOtherChords;
            }else{
              this.thirdKey = false;
            }
          }else{
            this.secondKey = false;
          }
        }
      }
    } 
   }
   else if(this.pianoActive==true)
   {
    for (let i=0; i<this.pianoChords.length; i++)
    {
      if(this.pianoChords[i].alt == div){
        if(this.pianoChords[i].firstKey == null){
          this.noKey = true;
          this.showTheThing = false;
        }else{
          this.noKey = false;
          this.showTheThing = true;
          this.firsthordInfo = this.pianoChords[i].firstKey;
          this.firstKeyPositionInfo = this.pianoChords[i].firstKeyPosition;
          this.firstOtherChordsSameKey = this.pianoChords[i].firstKeyOtherChords;
          if(this.pianoChords[i].secondKey != null){
            this.secondKey = true;
            this.secondChordInfo = this.pianoChords[i].secondKey;
            this.secondKeyPositionInfo = this.pianoChords[i].secondKeyPosition;
            this.secondOtherChordsSameKey = this.pianoChords[i].secondKeyOtherChords;
            if(this.pianoChords[i].thirdKey != null){
              this.thirdKey = true;
              this.thirdChordInfo = this.pianoChords[i].thirdKey;
              this.thirdKeyPositionInfor = this.pianoChords[i].thirdKeyPosition;
              this.thirdOtherChordsSameKey = this.pianoChords[i].thirdKeyOtherChords;
            }else{
              this.thirdKey = false;
              this.thirdChordInfo = this.pianoChords[i].thirdKey;
              this.thirdKeyPositionInfor = this.pianoChords[i].thirdKeyPosition;
              this.thirdOtherChordsSameKey = this.pianoChords[i].thirdKeyOtherChords;
            }
          }else{
            this.secondKey = false;
          }
        }
      }
    } 
  }
}

/* These functions handle the currently 'active' chord and add a class to it to make it stand out more */
  renderedCallback(){
    let imgs = this.template.querySelectorAll('img');
    for(let i = 0; i < imgs.length; i++){

      if(i == Math.floor(imgs.length/(imgs.length) + 1)){
        imgs[i].classList.add('focus-on-me'); 
      }
    }
  }

/* These functions handle the buttons to adjust the 'active' chord, moving it left and right */
  handleLeftClick(){
    this.showTheThing = false;
    this.secondKey = false;
    this.thirdKey = false;
    let imgs = this.template.querySelectorAll('img');
    let lastImg = imgs[imgs.length - 1].src;

    for(let i = imgs.length-1; i > 0; i--){
      imgs[i].src = imgs[i-1].src;
    }
    imgs[0].src = lastImg;
  }

  handleRightClick(){
    this.showTheThing = false;
    this.secondKey = false;
    this.thirdKey = false;
    let imgs = this.template.querySelectorAll('img');
    let firstImg = imgs[0].src;

    for(let i = 0; i < imgs.length - 1; i++){
      imgs[i].src = imgs[i+1].src;
    }
    imgs[imgs.length-1].src = firstImg;
  }
  /* End of chord functions */

/* there is absolutely a better way to do this but I was out of time and ideas this is what I had to do */
/* For your sake and my own shame please for the love of god do not look at what i had to do in order to get this to work, I've never hated myself more in my professional career than I have when i typed all of this out */
/* For your sake and my own shame please for the love of god do not look at what i had to do in order to get this to work, I've never hated myself more in my professional career than I have when i typed all of this out */
/* For your sake and my own shame please for the love of god do not look at what i had to do in order to get this to work, I've never hated myself more in my professional career than I have when i typed all of this out */
/* For your sake and my own shame please for the love of god do not look at what i had to do in order to get this to work, I've never hated myself more in my professional career than I have when i typed all of this out */
/* For your sake and my own shame please for the love of god do not look at what i had to do in order to get this to work, I've never hated myself more in my professional career than I have when i typed all of this out */
/* For your sake and my own shame please for the love of god do not look at what i had to do in order to get this to work, I've never hated myself more in my professional career than I have when i typed all of this out */
/* For your sake and my own shame please for the love of god do not look at what i had to do in order to get this to work, I've never hated myself more in my professional career than I have when i typed all of this out */
/* For your sake and my own shame please for the love of god do not look at what i had to do in order to get this to work, I've never hated myself more in my professional career than I have when i typed all of this out */
/* For your sake and my own shame please for the love of god do not look at what i had to do in order to get this to work, I've never hated myself more in my professional career than I have when i typed all of this out */
/* For your sake and my own shame please for the love of god do not look at what i had to do in order to get this to work, I've never hated myself more in my professional career than I have when i typed all of this out */
/* For your sake and my own shame please for the love of god do not look at what i had to do in order to get this to work, I've never hated myself more in my professional career than I have when i typed all of this out */

/* These arrays just hold information for each of the instruments, the images are pulled from the orgs static resources, I made the images myself */   
  guitarChords = [
    {name: 'A major', alt: 'A picture of an A Major chord', image: guitarA, firstKey: 'A', firstKeyPosition: '1st', firstKeyOtherChords: 'B, C#, D, E, F#', secondKey: 'E', secondKeyPosition: '4th', secondKeyOtherChords: 'E, F#, G#, B, C#', thirdKey: "D", thirdKeyPosition: "5th", thirdKeyOtherChords: 'D, Em, F#b, G, Bm'},
    {name: 'A sharp major', alt: 'A picture of an A# Major chord', image: guitarASharp},
    {name: 'B major', alt: 'A picture of a B Major chord', image: guitarB, firstKey: 'B', firstKeyPosition: '1st', firstKeyOtherChords: 'C#, D#, E, F#, G#, A#', secondKey: 'F#', secondKeyPosition: '4th', secondKeyOtherChords: 'F#, G#m, A#m, C#, D#m', thirdKey: 'E', thirdKeyPosition: '5th', thirdKeyOtherChords: 'E, F#m, G#m, A, C#m'},
    {name: 'C major', alt: 'A picture of a C Major chord', image: guitarC, firstKey: 'C', firstKeyPosition: '1st', firstKeyOtherChords: 'F, G7, Am, Dm, E7', secondKey: 'G', secondKeyPosition: '4th', secondKeyOtherChords: 'G, D7, Em, Am, B7', thirdKey: 'E', thirdKeyPosition: '5th', thirdKeyOtherChords: 'E, F#m, G#m, A, C#m'},
    {name: 'C sharp major', alt: 'A picture of a C# Major chord', image: guitarCSharp, firstKey: 'C#', firstKeyPosition: '1st', firstKeyOtherChords: 'D#, E#, F#, G#, A#, B#'},
    {name: 'D major', alt: 'A picture of a D Major chord', image: guitarD, firstKey: 'D', firstKeyPosition: '1st', firstKeyOtherChords: 'G, A7, Bm, Em, Gb7', secondKey: 'D', secondKeyPosition: '4th', secondKeyOtherChords: 'A, B, C#, E, F#, G#', thirdKey: 'G', thirdKeyPosition: '5th', thirdKeyOtherChords: 'G, Am, Bm, C, Em'},
    {name: 'D sharp major', alt: 'A picture of a D# Major chord', image: guitarDSharp},
    {name: 'E major', alt: 'A picture of an E Major chord', image: guitarE, firstKey: 'E', firstKeyPosition: '1st', firstKeyOtherChords: 'F#, G#, A, B, C#, D#', secondKey: 'B', secondKeyPosition: '4th', secondKeyOtherChords: 'B, C#, D#, F#, G#, A#', thirdKey: 'A', thirdKeyPosition: '5th', thirdKeyOtherChords: 'A, Bm, C#m, D, F#m'},
    {name: 'F major', alt: 'A picture of an F Major chord', image: guitarF, firstKey: 'F', firstKeyPosition: '1st', firstKeyOtherChords: 'G, A, Bb, C, D, E', secondKey: 'C', secondKeyPosition: '4th', secondKeyOtherChords: 'C, D, E, G, A, B', thirdKey: 'Bb', thirdKeyPosition: '5th', thirdKeyOtherChords: 'Bb, Cm, Dm, Eb, Gm'},
    {name: 'F sharp major', alt: 'A picture of an F# Major chord', image: guitarFSharp, firstKey: 'F#', firstKeyPosition: '1st', firstKeyOtherChords: 'G#, A#, B, C#, D#, E#, F#', secondKey: 'C#', secondKeyPosition: '4th', secondKeyOtherChords: 'C#, D#m, E#m, G#, A#m', thirdKey: 'B', thirdKeyPosition: '5th', thirdKeyOtherChords: 'B, C#m, D#m, E, G#m'},
    {name: 'G major', alt: 'A picture of a G Major chord', image: guitarG, firstKey: 'G', firstKeyPosition: '1st', firstKeyOtherChords: 'A, B, C, D, E, F#', secondKey: 'D', secondKeyPosition: '4th', secondKeyOtherChords: 'D, E, F#, A, B, C#', thirdKey: 'C', thirdKeyPosition: '5th', thirdKeyOtherChords: 'C, Dm, Em, F, Am'},
    {name: 'G sharp major', alt: 'A picture of a G# Major chord', image: guitarGSharp, firstKey: 'Ab', firstKeyPosition: '1st', firstKeyOtherChords: 'Bb, C, Db, Eb, F, G, Ab'},
    /* end of guitar major and start of guitar minor chords */
    {name: 'A minor', alt: 'A picture of an A minor chord', image: guitarAMinor, firstKey: 'C', firstKeyPosition: '6th', firstKeyOtherChords: 'C, Dm, Em, F, G', secondKey: 'F', secondKeyPosition: '3rd', secondKeyOtherChords: 'F, Gm, Bb, C, Dm', thirdKey: 'G', thirdKeyPosition: "2nd", thirdKeyOtherChords: 'G, Bm, C, D, Em'},
    {name: 'A sharp minor', alt: 'A picture of an A# Minor chord', image: guitarASharpMinor, firstKey: 'C#', firstKeyPosition: '6th', firstKeyOtherChords: 'C#, D#m, E#m, F#, G#', secondKey: 'F#', secondKeyPosition: '3rd', secondKeyOtherChords: 'F#, G#m, B, C#, D#m', thirdKey: "Ab", thirdKeyPosition: "2nd", thirdKeyOtherChords: 'Bbm, Cm, Db, Eb, Fm'},
    {name: 'B minor', alt: 'A picture of a B Minor chord', image: guitarBMinor, firstKey: 'A', firstKeyPosition: '2nd', firstKeyOtherChords: 'A, C#m, D, E, F#m', secondKey: 'G', secondKeyPosition: '3rd', secondKeyOtherChords: 'G, Am, C, D, Em', thirdKey: "D", thirdKeyPosition: "6th", thirdKeyOtherChords: 'D, Em, F#m, G, A'},
    {name: 'C minor', alt: 'A picture of a C Minor chord', image: guitarCMinor, firstKey: 'Bb', firstKeyPosition: '2nd', firstKeyOtherChords: 'Bb, Dm, Eb, F, Gm', secondKey: 'Ab', secondKeyPosition: '3rd', secondKeyOtherChords: 'Ab, Bbm, Db, Eb, Fm', thirdKey: "Eb", thirdKeyPosition: "6th", thirdKeyOtherChords: 'Eb, Fm, Gm, Ab, Bb'},
    {name: 'C sharp minor', alt: 'A picture of a C# Minor chord', image: guitarCSharpMinor, firstKey: 'B', firstKeyPosition: '2nd', firstKeyOtherChords: 'B, D#m, E, F#, G#m', secondKey: 'A', secondKeyPosition: '3rd', secondKeyOtherChords: 'A, Bm, D, E, F#m', thirdKey: "E", thirdKeyPosition: "6th", thirdKeyOtherChords: 'E, F#m, G#m, A, B'},
    {name: 'D minor', alt: 'A picture of a D Minor chord', image: guitarDMinor, firstKey: 'C', firstKeyPosition: '2nd', firstKeyOtherChords: 'C, Em, F, G, Am', secondKey: 'Bb', secondKeyPosition: '3rd', secondKeyOtherChords: 'Bb, Cm, Eb, F, Gm', thirdKey: "F", thirdKeyPosition: "6th", thirdKeyOtherChords: 'D, Em, F#m, G, A'},
    {name: 'D sharp minor', alt: 'A picture of a D# Minor chord', image: guitarDSharpMinor, firstKey: 'C#', firstKeyPosition: '2nd', firstKeyOtherChords: 'C#, E#m, F#, G#, A#m', secondKey: 'B', secondKeyPosition: '3rd', secondKeyOtherChords: 'B, C#m, E, F#, G#m', thirdKey: "F#", thirdKeyPosition: "6th", thirdKeyOtherChords: 'F#, G#m, A#m, B, C#'},
    {name: 'E minor', alt: 'A picture of an E Minor chord', image: guitarEMinor, firstKey: 'D', firstKeyPosition: '2nd', firstKeyOtherChords: 'D, F#m, G, A, Bm', secondKey: 'C', secondKeyPosition: '3rd', secondKeyOtherChords: 'C, Dm, F, G, Am', thirdKey: "G", thirdKeyPosition: "6th", thirdKeyOtherChords: 'G, Am, Bm, C, D'},
    {name: 'F minor', alt: 'A picture of a F Minor chord', image: guitarFMinor, firstKey: 'Eb', firstKeyPosition: '2nd', firstKeyOtherChords: 'Eb, Gm, Ab, Bb, Cm', secondKey: 'Db', secondKeyPosition: '3rd', secondKeyOtherChords: 'Db, Ebm, Gb, Ab, Bbm', thirdKey: "Ab", thirdKeyPosition: "6th", thirdKeyOtherChords: 'Ab, Bbm, Cm, Db, Eb, Fm'},
    {name: 'F sharp minor', alt: 'A picture of a F# Minor chord', image: guitarFSharpMinor, firstKey: 'E', firstKeyPosition: '2nd', firstKeyOtherChords: 'E, G#m, A, B, C#m', secondKey: 'D', secondKeyPosition: '3rd', secondKeyOtherChords: 'D, Em, G, A, Bm', thirdKey: "A", thirdKeyPosition: "6th", thirdKeyOtherChords: 'A, Bm, C#m, D, E'},
    {name: 'G minor', alt: 'A picture of a G Minor chord', image: guitarGMinor, firstKey: 'F', firstKeyPosition: '2nd', firstKeyOtherChords: 'F, Am, Bb, C, Dm', secondKey: 'Eb', secondKeyPosition: '3rd', secondKeyOtherChords: 'Eb, Fm, Ab, Bb, Cm', thirdKey: "Bb", thirdKeyPosition: "6th", thirdKeyOtherChords: 'Bb, Cm, Dm, Eb, F'},
    {name: 'G sharp minor', alt: 'A picture of an G# Minor chord', image: guitarGSharpMinor, firstKey: 'F#', firstKeyPosition: '2nd', firstKeyOtherChords: 'F#, A#m, B, C#, D#m', secondKey: 'E', secondKeyPosition: '3rd', secondKeyOtherChords: 'E, F#m, A, B, C#m', thirdKey: "B", thirdKeyPosition: "6th", thirdKeyOtherChords: 'B, C#m, D#m, E, F#'}
  ];

  bassChords = [
    {name: 'A major', alt: 'A picture of an A Major chord', image: bassA, firstKey: 'A', firstKeyPosition: '1st', firstKeyOtherChords: 'B, C#, D, E, F#', secondKey: 'E', secondKeyPosition: '4th', secondKeyOtherChords: 'E, F#, G#, B, C#', thirdKey: "D", thirdKeyPosition: "5th", thirdKeyOtherChords: 'D, Em, F#b, G, Bm'},
    {name: 'A sharp major', alt: 'A picture of an A# Major chord', image: bassASharp},
    {name: 'B major', alt: 'A picture of a B Major chord', image: bassB, firstKey: 'B', firstKeyPosition: '1st', firstKeyOtherChords: 'C#, D#, E, F#, G#, A#', secondKey: 'F#', secondKeyPosition: '4th', secondKeyOtherChords: 'F#, G#m, A#m, C#, D#m', thirdKey: 'E', thirdKeyPosition: '5th', thirdKeyOtherChords: 'E, F#m, G#m, A, C#m'},
    {name: 'C major', alt: 'A picture of a C Major chord', image: bassC, firstKey: 'C', firstKeyPosition: '1st', firstKeyOtherChords: 'F, G7, Am, Dm, E7', secondKey: 'G', secondKeyPosition: '4th', secondKeyOtherChords: 'G, D7, Em, Am, B7', thirdKey: 'E', thirdKeyPosition: '5th', thirdKeyOtherChords: 'E, F#m, G#m, A, C#m'},
    {name: 'C sharp major', alt: 'A picture of a C# Major chord', image: bassCSharp, firstKey: 'C#', firstKeyPosition: '1st', firstKeyOtherChords: 'D#, E#, F#, G#, A#, B#'},
    {name: 'D major', alt: 'A picture of a D Major chord', image: bassD, firstKey: 'D', firstKeyPosition: '1st', firstKeyOtherChords: 'G, A7, Bm, Em, Gb7', secondKey: 'D', secondKeyPosition: '4th', secondKeyOtherChords: 'A, B, C#, E, F#, G#', thirdKey: 'G', thirdKeyPosition: '5th', thirdKeyOtherChords: 'G, Am, Bm, C, Em'},
    {name: 'D sharp major', alt: 'A picture of a D# Major chord', image: bassDSharp},
    {name: 'E major', alt: 'A picture of an E Major chord', image: bassE, firstKey: 'E', firstKeyPosition: '1st', firstKeyOtherChords: 'F#, G#, A, B, C#, D#', secondKey: 'B', secondKeyPosition: '4th', secondKeyOtherChords: 'B, C#, D#, F#, G#, A#', thirdKey: 'A', thirdKeyPosition: '5th', thirdKeyOtherChords: 'A, Bm, C#m, D, F#m'},
    {name: 'F major', alt: 'A picture of an F Major chord', image: bassF, firstKey: 'F', firstKeyPosition: '1st', firstKeyOtherChords: 'G, A, Bb, C, D, E', secondKey: 'C', secondKeyPosition: '4th', secondKeyOtherChords: 'C, D, E, G, A, B', thirdKey: 'Bb', thirdKeyPosition: '5th', thirdKeyOtherChords: 'Bb, Cm, Dm, Eb, Gm'},
    {name: 'F sharp major', alt: 'A picture of an F# Major chord', image: bassFSharp, firstKey: 'F#', firstKeyPosition: '1st', firstKeyOtherChords: 'G#, A#, B, C#, D#, E#, F#', secondKey: 'C#', secondKeyPosition: '4th', secondKeyOtherChords: 'C#, D#m, E#m, G#, A#m', thirdKey: 'B', thirdKeyPosition: '5th', thirdKeyOtherChords: 'B, C#m, D#m, E, G#m'},
    {name: 'G major', alt: 'A picture of a G Major chord', image: bassG, firstKeyPosition: '1st', firstKeyOtherChords: 'A, B, C, D, E, F#', secondKey: 'D', secondKeyPosition: '4th', secondKeyOtherChords: 'D, E, F#, A, B, C#', thirdKey: 'C', thirdKeyPosition: '5th', thirdKeyOtherChords: 'C, Dm, Em, F, Am'},
    {name: 'G sharp major', alt: 'A picture of a G# Major chord', image: bassGSharp, firstKey: 'Ab', firstKeyPosition: '1st', firstKeyOtherChords: 'Bb, C, Db, Eb, F, G, Ab'},
    /* End of bass major chords and start of bass minor chords */
    {name: 'A minor', alt: 'A picture of an A minor chord', image: bassAMinor, firstKey: 'C', firstKeyPosition: '6th', firstKeyOtherChords: 'C, Dm, Em, F, G', secondKey: 'F', secondKeyPosition: '3rd', secondKeyOtherChords: 'F, Gm, Bb, C, Dm', thirdKey: 'G', thirdKeyPosition: "2nd", thirdKeyOtherChords: 'G, Bm, C, D, Em'},
    {name: 'A sharp minor', alt: 'A picture of an A# Minor chord', image: bassASharpMinor, firstKey: 'C#', firstKeyPosition: '6th', firstKeyOtherChords: 'C#, D#m, E#m, F#, G#', secondKey: 'F#', secondKeyPosition: '3rd', secondKeyOtherChords: 'F#, G#m, B, C#, D#m', thirdKey: "Ab", thirdKeyPosition: "2nd", thirdKeyOtherChords: 'Bbm, Cm, Db, Eb, Fm'},
    {name: 'B minor', alt: 'A picture of a B Minor chord', image: bassBMinor, firstKey: 'A', firstKeyPosition: '2nd', firstKeyOtherChords: 'A, C#m, D, E, F#m', secondKey: 'G', secondKeyPosition: '3rd', secondKeyOtherChords: 'G, Am, C, D, Em', thirdKey: "D", thirdKeyPosition: "6th", thirdKeyOtherChords: 'D, Em, F#m, G, A'},
    {name: 'C minor', alt: 'A picture of a C Minor chord', image: bassCMinor, firstKey: 'Bb', firstKeyPosition: '2nd', firstKeyOtherChords: 'Bb, Dm, Eb, F, Gm', secondKey: 'Ab', secondKeyPosition: '3rd', secondKeyOtherChords: 'Ab, Bbm, Db, Eb, Fm', thirdKey: "Eb", thirdKeyPosition: "6th", thirdKeyOtherChords: 'Eb, Fm, Gm, Ab, Bb'},
    {name: 'C sharp minor', alt: 'A picture of a C# Minor chord', image: bassCSharpMinor, firstKey: 'B', firstKeyPosition: '2nd', firstKeyOtherChords: 'B, D#m, E, F#, G#m', secondKey: 'A', secondKeyPosition: '3rd', secondKeyOtherChords: 'A, Bm, D, E, F#m', thirdKey: "E", thirdKeyPosition: "6th", thirdKeyOtherChords: 'E, F#m, G#m, A, B'},
    {name: 'D minor', alt: 'A picture of a D Minor chord', image: bassDMinor, firstKey: 'C', firstKeyPosition: '2nd', firstKeyOtherChords: 'C, Em, F, G, Am', secondKey: 'Bb', secondKeyPosition: '3rd', secondKeyOtherChords: 'Bb, Cm, Eb, F, Gm', thirdKey: "F", thirdKeyPosition: "6th", thirdKeyOtherChords: 'D, Em, F#m, G, A'},
    {name: 'D sharp minor', alt: 'A picture of a D# Minor chord', image: bassDSharpMinor, firstKey: 'C#', firstKeyPosition: '2nd', firstKeyOtherChords: 'C#, E#m, F#, G#, A#m', secondKey: 'B', secondKeyPosition: '3rd', secondKeyOtherChords: 'B, C#m, E, F#, G#m', thirdKey: "F#", thirdKeyPosition: "6th", thirdKeyOtherChords: 'F#, G#m, A#m, B, C#'},
    {name: 'E minor', alt: 'A picture of an E Minor chord', image: bassEMinor, firstKey: 'D', firstKeyPosition: '2nd', firstKeyOtherChords: 'D, F#m, G, A, Bm', secondKey: 'C', secondKeyPosition: '3rd', secondKeyOtherChords: 'C, Dm, F, G, Am', thirdKey: "G", thirdKeyPosition: "6th", thirdKeyOtherChords: 'G, Am, Bm, C, D'},
    {name: 'F minor', alt: 'A picture of a F Minor chord', image: bassFMinor, firstKey: 'Eb', firstKeyPosition: '2nd', firstKeyOtherChords: 'Eb, Gm, Ab, Bb, Cm', secondKey: 'Db', secondKeyPosition: '3rd', secondKeyOtherChords: 'Db, Ebm, Gb, Ab, Bbm', thirdKey: "Ab", thirdKeyPosition: "6th", thirdKeyOtherChords: 'Ab, Bbm, Cm, Db, Eb, Fm'},
    {name: 'F sharp minor', alt: 'A picture of a F# Minor chord', image: bassFSharpMinor, firstKey: 'E', firstKeyPosition: '2nd', firstKeyOtherChords: 'E, G#m, A, B, C#m', secondKey: 'D', secondKeyPosition: '3rd', secondKeyOtherChords: 'D, Em, G, A, Bm', thirdKey: "A", thirdKeyPosition: "6th", thirdKeyOtherChords: 'A, Bm, C#m, D, E'},
    {name: 'G minor', alt: 'A picture of a G Minor chord', image: bassGMinor, firstKey: 'F', firstKeyPosition: '2nd', firstKeyOtherChords: 'F, Am, Bb, C, Dm', secondKey: 'Eb', secondKeyPosition: '3rd', secondKeyOtherChords: 'Eb, Fm, Ab, Bb, Cm', thirdKey: "Bb", thirdKeyPosition: "6th", thirdKeyOtherChords: 'Bb, Cm, Dm, Eb, F'},
    {name: 'G sharp minor', alt: 'A picture of an G# Minor chord', image: bassGSharpMinor, firstKey: 'F#', firstKeyPosition: '2nd', firstKeyOtherChords: 'F#, A#m, B, C#, D#m', secondKey: 'E', secondKeyPosition: '3rd', secondKeyOtherChords: 'E, F#m, A, B, C#m', thirdKey: "B", thirdKeyPosition: "6th", thirdKeyOtherChords: 'B, C#m, D#m, E, F#'}
  ];

  pianoChords = [
    {name: 'A major', alt: 'A picture of an A Major chord', image: pianoA,firstKey: 'A', firstKeyPosition: '1st', firstKeyOtherChords: 'B, C#, D, E, F#', secondKey: 'E', secondKeyPosition: '4th', secondKeyOtherChords: 'E, F#, G#, B, C#', thirdKey: "D", thirdKeyPosition: "5th", thirdKeyOtherChords: 'D, Em, F#b, G, Bm'},
    {name: 'A sharp major', alt: 'A picture of an A# Major chord', image: pianoASharp},
    {name: 'B major', alt: 'A picture of a B Major chord', image: pianoB, firstKey: 'B', firstKeyPosition: '1st', firstKeyOtherChords: 'C#, D#, E, F#, G#, A#', secondKey: 'F#', secondKeyPosition: '4th', secondKeyOtherChords: 'F#, G#m, A#m, C#, D#m', thirdKey: 'E', thirdKeyPosition: '5th', thirdKeyOtherChords: 'E, F#m, G#m, A, C#m'},
    {name: 'C major', alt: 'A picture of a C Major chord', image: pianoC, firstKey: 'C', firstKeyPosition: '1st', firstKeyOtherChords: 'F, G7, Am, Dm, E7', secondKey: 'G', secondKeyPosition: '4th', secondKeyOtherChords: 'G, D7, Em, Am, B7', thirdKey: 'E', thirdKeyPosition: '5th', thirdKeyOtherChords: 'E, F#m, G#m, A, C#m'},
    {name: 'C sharp major', alt: 'A picture of a C# Major chord', image: pianoCSharp, firstKey: 'C#', firstKeyPosition: '1st', firstKeyOtherChords: 'D#, E#, F#, G#, A#, B#'},
    {name: 'D major', alt: 'A picture of a D Major chord', image: pianoD, firstKey: 'D', firstKeyPosition: '1st', firstKeyOtherChords: 'G, A7, Bm, Em, Gb7', secondKey: 'D', secondKeyPosition: '4th', secondKeyOtherChords: 'A, B, C#, E, F#, G#', thirdKey: 'G', thirdKeyPosition: '5th', thirdKeyOtherChords: 'G, Am, Bm, C, Em'},
    {name: 'D sharp major', alt: 'A picture of a D# Major chord', image: pianoDSharp},
    {name: 'E major', alt: 'A picture of an E Major chord', image: pianoE, firstKey: 'E', firstKeyPosition: '1st', firstKeyOtherChords: 'F#, G#, A, B, C#, D#', secondKey: 'B', secondKeyPosition: '4th', secondKeyOtherChords: 'B, C#, D#, F#, G#, A#', thirdKey: 'A', thirdKeyPosition: '5th', thirdKeyOtherChords: 'A, Bm, C#m, D, F#m'},
    {name: 'F major', alt: 'A picture of an F Major chord', image: pianoF, firstKey: 'F', firstKeyPosition: '1st', firstKeyOtherChords: 'G, A, Bb, C, D, E', secondKey: 'C', secondKeyPosition: '4th', secondKeyOtherChords: 'C, D, E, G, A, B', thirdKey: 'Bb', thirdKeyPosition: '5th', thirdKeyOtherChords: 'Bb, Cm, Dm, Eb, Gm'},
    {name: 'F sharp major', alt: 'A picture of an F# Major chord', image: pianoFSharp, firstKey: 'F#', firstKeyPosition: '1st', firstKeyOtherChords: 'G#, A#, B, C#, D#, E#, F#', secondKey: 'C#', secondKeyPosition: '4th', secondKeyOtherChords: 'C#, D#m, E#m, G#, A#m', thirdKey: 'B', thirdKeyPosition: '5th', thirdKeyOtherChords: 'B, C#m, D#m, E, G#m'},
    {name: 'G major', alt: 'A picture of a G Major chord', image: pianoG, firstKeyPosition: '1st', firstKeyOtherChords: 'A, B, C, D, E, F#', secondKey: 'D', secondKeyPosition: '4th', secondKeyOtherChords: 'D, E, F#, A, B, C#', thirdKey: 'C', thirdKeyPosition: '5th', thirdKeyOtherChords: 'C, Dm, Em, F, Am'},
    {name: 'G sharp major', alt: 'A picture of a G# Major chord', image: pianoGSharp, firstKey: 'Ab', firstKeyPosition: '1st', firstKeyOtherChords: 'Bb, C, Db, Eb, F, G, Ab'},
    /* End of piano major chords and start of piano minor chords */
    {name: 'A minor', alt: 'A picture of an A minor chord', image: pianoAMinor, firstKey: 'C', firstKeyPosition: '6th', firstKeyOtherChords: 'C, Dm, Em, F, G', secondKey: 'F', secondKeyPosition: '3rd', secondKeyOtherChords: 'F, Gm, Bb, C, Dm', thirdKey: 'G', thirdKeyPosition: "2nd", thirdKeyOtherChords: 'G, Bm, C, D, Em'},
    {name: 'A sharp minor', alt: 'A picture of an A# Minor chord', image: pianoASharpMinor, firstKey: 'C#', firstKeyPosition: '6th', firstKeyOtherChords: 'C#, D#m, E#m, F#, G#', secondKey: 'F#', secondKeyPosition: '3rd', secondKeyOtherChords: 'F#, G#m, B, C#, D#m', thirdKey: "Ab", thirdKeyPosition: "2nd", thirdKeyOtherChords: 'Bbm, Cm, Db, Eb, Fm'},
    {name: 'B minor', alt: 'A picture of a B Minor chord', image: pianoBMinor, firstKey: 'A', firstKeyPosition: '2nd', firstKeyOtherChords: 'A, C#m, D, E, F#m', secondKey: 'G', secondKeyPosition: '3rd', secondKeyOtherChords: 'G, Am, C, D, Em', thirdKey: "D", thirdKeyPosition: "6th", thirdKeyOtherChords: 'D, Em, F#m, G, A'},
    {name: 'C minor', alt: 'A picture of a C Minor chord', image: pianoCMinor, firstKey: 'Bb', firstKeyPosition: '2nd', firstKeyOtherChords: 'Bb, Dm, Eb, F, Gm', secondKey: 'Ab', secondKeyPosition: '3rd', secondKeyOtherChords: 'Ab, Bbm, Db, Eb, Fm', thirdKey: "Eb", thirdKeyPosition: "6th", thirdKeyOtherChords: 'Eb, Fm, Gm, Ab, Bb'},
    {name: 'C sharp minor', alt: 'A picture of a C# Minor chord', image: pianoCSharpMinor, firstKey: 'B', firstKeyPosition: '2nd', firstKeyOtherChords: 'B, D#m, E, F#, G#m', secondKey: 'A', secondKeyPosition: '3rd', secondKeyOtherChords: 'A, Bm, D, E, F#m', thirdKey: "E", thirdKeyPosition: "6th", thirdKeyOtherChords: 'E, F#m, G#m, A, B'},
    {name: 'D minor', alt: 'A picture of a D Minor chord', image: pianoDMinor, firstKey: 'C', firstKeyPosition: '2nd', firstKeyOtherChords: 'C, Em, F, G, Am', secondKey: 'Bb', secondKeyPosition: '3rd', secondKeyOtherChords: 'Bb, Cm, Eb, F, Gm', thirdKey: "F", thirdKeyPosition: "6th", thirdKeyOtherChords: 'D, Em, F#m, G, A'},
    {name: 'D sharp minor', alt: 'A picture of a D# Minor chord', image: pianoDSharpMinor, firstKey: 'C#', firstKeyPosition: '2nd', firstKeyOtherChords: 'C#, E#m, F#, G#, A#m', secondKey: 'B', secondKeyPosition: '3rd', secondKeyOtherChords: 'B, C#m, E, F#, G#m', thirdKey: "F#", thirdKeyPosition: "6th", thirdKeyOtherChords: 'F#, G#m, A#m, B, C#'},
    {name: 'E minor', alt: 'A picture of an E Minor chord', image: pianoEMinor, firstKey: 'D', firstKeyPosition: '2nd', firstKeyOtherChords: 'D, F#m, G, A, Bm', secondKey: 'C', secondKeyPosition: '3rd', secondKeyOtherChords: 'C, Dm, F, G, Am', thirdKey: "G", thirdKeyPosition: "6th", thirdKeyOtherChords: 'G, Am, Bm, C, D'},
    {name: 'F minor', alt: 'A picture of a F Minor chord', image: pianoFMinor, firstKey: 'Eb', firstKeyPosition: '2nd', firstKeyOtherChords: 'Eb, Gm, Ab, Bb, Cm', secondKey: 'Db', secondKeyPosition: '3rd', secondKeyOtherChords: 'Db, Ebm, Gb, Ab, Bbm', thirdKey: "Ab", thirdKeyPosition: "6th", thirdKeyOtherChords: 'Ab, Bbm, Cm, Db, Eb, Fm'},
    {name: 'F sharp minor', alt: 'A picture of a F# Minor chord', image: pianoFSharpMinor, firstKey: 'E', firstKeyPosition: '2nd', firstKeyOtherChords: 'E, G#m, A, B, C#m', secondKey: 'D', secondKeyPosition: '3rd', secondKeyOtherChords: 'D, Em, G, A, Bm', thirdKey: "A", thirdKeyPosition: "6th", thirdKeyOtherChords: 'A, Bm, C#m, D, E'},
    {name: 'G minor', alt: 'A picture of a G Minor chord', image: pianoGMinor, firstKey: 'F', firstKeyPosition: '2nd', firstKeyOtherChords: 'F, Am, Bb, C, Dm', secondKey: 'Eb', secondKeyPosition: '3rd', secondKeyOtherChords: 'Eb, Fm, Ab, Bb, Cm', thirdKey: "Bb", thirdKeyPosition: "6th", thirdKeyOtherChords: 'Bb, Cm, Dm, Eb, F'},
    {name: 'G sharp minor', alt: 'A picture of an G# Minor chord', image: pianoGSharpMinor, firstKey: 'F#', firstKeyPosition: '2nd', firstKeyOtherChords: 'F#, A#m, B, C#, D#m', secondKey: 'E', secondKeyPosition: '3rd', secondKeyOtherChords: 'E, F#m, A, B, C#m', thirdKey: "B", thirdKeyPosition: "6th", thirdKeyOtherChords: 'B, C#m, D#m, E, F#'}
  ];
}



import guitarA from '@salesforce/resourceUrl/guitarA';
import guitarASharp from '@salesforce/resourceUrl/guitarASharp';
import guitarB from '@salesforce/resourceUrl/guitarB';
import guitarC from '@salesforce/resourceUrl/guitarC';
import guitarCSharp from '@salesforce/resourceUrl/guitarCSharp';
import guitarD from '@salesforce/resourceUrl/guitarD';
import guitarDSharp from '@salesforce/resourceUrl/guitarDSharp';
import guitarE from '@salesforce/resourceUrl/guitarE';
import guitarF from '@salesforce/resourceUrl/guitarF';
import guitarFSharp from '@salesforce/resourceUrl/guitarFSharp';
import guitarG from '@salesforce/resourceUrl/guitarG';
import guitarGSharp from '@salesforce/resourceUrl/guitarGSharp';
import guitarAMinor from '@salesforce/resourceUrl/guitarAMinor';
import guitarASharpMinor from '@salesforce/resourceUrl/guitarASharpMinor';
import guitarBMinor from '@salesforce/resourceUrl/guitarBMinor';
import guitarCMinor from '@salesforce/resourceUrl/guitarCMinor';
import guitarCSharpMinor from '@salesforce/resourceUrl/guitarCSharpMinor';
import guitarDMinor from '@salesforce/resourceUrl/guitarDMinor';
import guitarDSharpMinor from '@salesforce/resourceUrl/guitarDSharpMinor';
import guitarEMinor from '@salesforce/resourceUrl/guitarEMinor';
import guitarFMinor from '@salesforce/resourceUrl/guitarFMinor';
import guitarFSharpMinor from '@salesforce/resourceUrl/guitarFSharpMinor';
import guitarGMinor from '@salesforce/resourceUrl/guitarGMinor';
import guitarGSharpMinor from '@salesforce/resourceUrl/guitarGSharpMinor';

import bassA from '@salesforce/resourceUrl/bassA';
import bassASharp from '@salesforce/resourceUrl/bassASharp';
import bassB from '@salesforce/resourceUrl/bassB';
import bassC from '@salesforce/resourceUrl/bassC';
import bassCSharp from '@salesforce/resourceUrl/bassCSharp';
import bassD from '@salesforce/resourceUrl/bassD';
import bassDSharp from '@salesforce/resourceUrl/bassDSharp';
import bassE from '@salesforce/resourceUrl/bassE';
import bassF from '@salesforce/resourceUrl/bassF';
import bassFSharp from '@salesforce/resourceUrl/bassFSharp';
import bassG from '@salesforce/resourceUrl/bassG';
import bassGSharp from '@salesforce/resourceUrl/bassGSharp';
import bassAMinor from '@salesforce/resourceUrl/bassAMinor';
import bassASharpMinor from '@salesforce/resourceUrl/bassASharpMinor';
import bassBMinor from '@salesforce/resourceUrl/bassBMinor';
import bassCMinor from '@salesforce/resourceUrl/bassCMinor';
import bassCSharpMinor from '@salesforce/resourceUrl/bassCSharpMinor';
import bassDMinor from '@salesforce/resourceUrl/bassDMinor';
import bassDSharpMinor from '@salesforce/resourceUrl/bassDSharpMinor';
import bassEMinor from '@salesforce/resourceUrl/bassEMinor';
import bassFMinor from '@salesforce/resourceUrl/bassFMinor';
import bassFSharpMinor from '@salesforce/resourceUrl/bassFSharpMinor';
import bassGMinor from '@salesforce/resourceUrl/bassGMinor';
import bassGSharpMinor from '@salesforce/resourceUrl/bassGSharpMinor';

import pianoA from '@salesforce/resourceUrl/pianoA';
import pianoASharp from '@salesforce/resourceUrl/pianoASharp';
import pianoB from '@salesforce/resourceUrl/pianoB';
import pianoC from '@salesforce/resourceUrl/pianoC';
import pianoCSharp from '@salesforce/resourceUrl/pianoCSharp';
import pianoD from '@salesforce/resourceUrl/pianoD';
import pianoDSharp from '@salesforce/resourceUrl/pianoDSharp';
import pianoE from '@salesforce/resourceUrl/pianoE';
import pianoF from '@salesforce/resourceUrl/pianoF';
import pianoFSharp from '@salesforce/resourceUrl/pianoFSharp';
import pianoG from '@salesforce/resourceUrl/pianoG';
import pianoGSharp from '@salesforce/resourceUrl/pianoGSharp';
import pianoAMinor from '@salesforce/resourceUrl/pianoAMinor';
import pianoASharpMinor from '@salesforce/resourceUrl/pianoASharpMinor';
import pianoBMinor from '@salesforce/resourceUrl/pianoBMinor';
import pianoCMinor from '@salesforce/resourceUrl/pianoCMinor';
import pianoCSharpMinor from '@salesforce/resourceUrl/pianoCSharpMinor';
import pianoDMinor from '@salesforce/resourceUrl/pianoDMinor';
import pianoDSharpMinor from '@salesforce/resourceUrl/pianoDSharpMinor';
import pianoEMinor from '@salesforce/resourceUrl/pianoEMinor';
import pianoFMinor from '@salesforce/resourceUrl/pianoFMinor';
import pianoFSharpMinor from '@salesforce/resourceUrl/pianoFSharpMinor';
import pianoGMinor from '@salesforce/resourceUrl/pianoGMinor';
import pianoGSharpMinor from '@salesforce/resourceUrl/pianoGSharpMinor';
