import { LightningElement, track } from 'lwc';

export default class App extends LightningElement {
/* Initializes the templates for each instrument to not display by default */
  guitarActive  = true;
  bassActive    = false;
  pianoActive   = false;
  showTheThing  = false;

  /* variables to dynamically update extra info about chords */
  @track
  chordInfo;
  @track
  keyPositionInfo;
  @track
  otherChordsSameKey;

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
    this.showTheThing = !this.showTheThing;
    let div = event.target.src;
    if(this.guitarActive==true){
      for (let i=0; i<this.guitarChords.length; i++)
      {
        if(this.guitarChords[i].image == div){
            this.chordInfo = this.guitarChords[i].key;
            this.keyPositionInfo = this.guitarChords[i].keyPosition;
            this.otherChordsSameKey = this.guitarChords[i].otherChords;
        }
      } 
   }
   else if (this.bassActive==true){
    for (let i=0; i<this.bassChords.length; i++)
    {
      if(this.bassChords[i].image == div){
          this.chordInfo = this.bassChords[i].key;
          this.keyPositionInfo = this.bassChords[i].keyPosition;
          this.otherChordsSameKey = this.bassChords[i].otherChords;
      }
    } 
   }
   else if(this.pianoActive==true)
   {
    for (let i=0; i<this.pianoChords.length; i++)
    {
      if(this.pianoChords[i].image == div){
          this.chordInfo = this.pianoChords[i].key;
          this.keyPositionInfo = this.pianoChords[i].keyPosition;
          this.otherChordsSameKey = this.pianoChords[i].otherChords;
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
    let imgs = this.template.querySelectorAll('img');
    let lastImg = imgs[imgs.length - 1].src;

    for(let i = imgs.length-1; i > 0; i--){
      imgs[i].src = imgs[i-1].src;
    }
    imgs[0].src = lastImg;
  }

  handleRightClick(){
    let imgs = this.template.querySelectorAll('img');
    let firstImg = imgs[0].src;

    for(let i = 0; i < imgs.length - 1; i++){
      imgs[i].src = imgs[i+1].src;
    }
    imgs[imgs.length-1].src = firstImg;
  }
  /* End of chord functions */

/* These arrays just hold information for each of the instruments, the images are pulled from the orgs static resources */   
  guitarChords = [
    {name: 'A major', alt: 'A picture of an A Major chord', image: imagesResource + '/guitarChords/Major/A', key: 'Major', keyPosition: '1st', otherChords: ''},
    {name: 'A sharp major', alt: 'A picture of an A# Major chord', image: imagesResource + '/guitarChords/Major/ASharpMinor', key: 'Major', keyPosition: '1st', otherChords: ''},
    {name: 'B major', alt: 'A picture of a B Major chord', image: '', key: 'Major', keyPosition: '1st', otherChords: ''},
    {name: 'C major', alt: 'A picture of a C Major chord', image: '', key: 'Major', keyPosition: '1st', otherChords: ''},
    {name: 'C sharp major', alt: 'A picture of a C# Major chord', image: '', key: 'Major', keyPosition: '1st', otherChords: ''},
    {name: 'D major', alt: 'A picture of a D Major chord', image: '', key: 'Major', keyPosition: '1st', otherChords: ''},
    {name: 'D sharp major', alt: 'A picture of a D# Major chord', image: '', key: 'Major', keyPosition: '1st', otherChords: ''},
    {name: 'E major', alt: 'A picture of an E Major chord', image: '', key: 'Major', keyPosition: '1st', otherChords: ''},
    {name: 'F major', alt: 'A picture of an F Major chord', image: '', key: 'Major', keyPosition: '1st', otherChords: ''},
    {name: 'F sharp major', alt: 'A picture of an F# Major chord', image: '', key: 'Major', keyPosition: '1st', otherChords: ''},
    {name: 'G major', alt: 'A picture of a G Major chord', image: '', key: 'Major', keyPosition: '1st', otherChords: ''},
    {name: 'G sharp major', alt: 'A picture of a G# Major chord', image: '', key: 'Major', keyPosition: '1st', otherChords: ''},
    {name: 'A minor', alt: 'A picture of an A minor chord', image: '', key: 'Minor', keyPosition: '1st', otherChords: ''},
    {name: 'A sharp minor', alt: 'A picture of an A# Minor chord', image: '', key: 'Minor', keyPosition: '1st', otherChords: ''},
    {name: 'B minor', alt: 'A picture of a B Minor chord', image: '', key: 'Minor', keyPosition: '1st', otherChords: ''},
    {name: 'C minor', alt: 'A picture of a C Minor chord', image: '', key: 'Minor', keyPosition: '1st', otherChords: ''},
    {name: 'C sharp minor', alt: 'A picture of a C# Minor chord', image: '', key: 'Minor', keyPosition: '1st', otherChords: ''},
    {name: 'D minor', alt: 'A picture of a D Minor chord', image: '', key: 'Minor', keyPosition: '1st', otherChords: ''},
    {name: 'D sharp minor', alt: 'A picture of a D# Minor chord', image: '', key: 'Minor', keyPosition: '1st', otherChords: ''},
    {name: 'E minor', alt: 'A picture of an E Minor chord', image: '', key: 'Minor', keyPosition: '1st', otherChords: ''},
    {name: 'F minor', alt: 'A picture of a F Minor chord', image: '', key: 'Minor', keyPosition: '1st', otherChords: ''},
    {name: 'F sharp minor', alt: 'A picture of a F# Minor chord', image: '', key: 'Minor', keyPosition: '1st', otherChords: ''},
    {name: 'G minor', alt: 'A picture of a G Minor chord', image: '', key: 'Minor', keyPosition: '1st', otherChords: ''},
    {name: 'G sharp minor', alt: 'A picture of an G# Minor chord', image: '', key: 'Minor', keyPosition: '1st', otherChords: ''}
  ];

  bassChords = [
    {name: 'A major', alt: 'A picture of an A Major chord', image: imagesResource + '/bassChords/Major/A.png', key: 'Major', keyPosition: '1st', otherChords: ''},
    {name: 'A sharp major', alt: 'A picture of an A# Major chord', image: '', key: 'Major', keyPosition: '1st', otherChords: ''},
    {name: 'B major', alt: 'A picture of a B Major chord', image: '', key: 'Major', keyPosition: '1st', otherChords: ''},
    {name: 'C major', alt: 'A picture of a C Major chord', image: '', key: 'Major', keyPosition: '1st', otherChords: ''},
    {name: 'C sharp major', alt: 'A picture of a C# Major chord', image: '', key: 'Major', keyPosition: '1st', otherChords: ''},
    {name: 'D major', alt: 'A picture of a D Major chord', image: '', key: 'Major', keyPosition: '1st', otherChords: ''},
    {name: 'D sharp major', alt: 'A picture of a D# Major chord', image: '', key: 'Major', keyPosition: '1st', otherChords: ''},
    {name: 'E major', alt: 'A picture of an E Major chord', image: '', key: 'Major', keyPosition: '1st', otherChords: ''},
    {name: 'F major', alt: 'A picture of an F Major chord', image: '', key: 'Major', keyPosition: '1st', otherChords: ''},
    {name: 'F sharp major', alt: 'A picture of an F# Major chord', image: '', key: 'Major', keyPosition: '1st', otherChords: ''},
    {name: 'G major', alt: 'A picture of a G Major chord', image: '', key: 'Major', keyPosition: '1st', otherChords: ''},
    {name: 'G sharp major', alt: 'A picture of a G# Major chord', image: '', key: 'Major', keyPosition: '1st', otherChords: ''},
    {name: 'A minor', alt: 'A picture of an A minor chord', image: '', key: 'Minor', keyPosition: '1st', otherChords: ''},
    {name: 'A sharp minor', alt: 'A picture of an A# Minor chord', image: '', key: 'Minor', keyPosition: '1st', otherChords: ''},
    {name: 'B minor', alt: 'A picture of a B Minor chord', image: '', key: 'Minor', keyPosition: '1st', otherChords: ''},
    {name: 'C minor', alt: 'A picture of a C Minor chord', image: '', key: 'Minor', keyPosition: '1st', otherChords: ''},
    {name: 'C sharp minor', alt: 'A picture of a C# Minor chord', image: '', key: 'Minor', keyPosition: '1st', otherChords: ''},
    {name: 'D minor', alt: 'A picture of a D Minor chord', image: '', key: 'Minor', keyPosition: '1st', otherChords: ''},
    {name: 'D sharp minor', alt: 'A picture of a D# Minor chord', image: '', key: 'Minor', keyPosition: '1st', otherChords: ''},
    {name: 'E minor', alt: 'A picture of an E Minor chord', image: '', key: 'Minor', keyPosition: '1st', otherChords: ''},
    {name: 'F minor', alt: 'A picture of a F Minor chord', image: '', key: 'Minor', keyPosition: '1st', otherChords: ''},
    {name: 'F sharp minor', alt: 'A picture of a F# Minor chord', image: '', key: 'Minor', keyPosition: '1st', otherChords: ''},
    {name: 'G minor', alt: 'A picture of a G Minor chord', image: '', key: 'Minor', keyPosition: '1st', otherChords: ''},
    {name: 'G sharp minor', alt: 'A picture of an G# Minor chord', image: '', key: 'Minor', keyPosition: '1st', otherChords: ''}
  ];

  pianoChords = [
    {name: 'A major', alt: 'A picture of an A Major chord', image: '', key: 'Major', keyPosition: '1st', otherChords: ''},
    {name: 'A sharp major', alt: 'A picture of an A# Major chord', image: '', key: 'Major', keyPosition: '1st', otherChords: ''},
    {name: 'B major', alt: 'A picture of a B Major chord', image: '', key: 'Major', keyPosition: '1st', otherChords: ''},
    {name: 'C major', alt: 'A picture of a C Major chord', image: '', key: 'Major', keyPosition: '1st', otherChords: ''},
    {name: 'C sharp major', alt: 'A picture of a C# Major chord', image: '', key: 'Major', keyPosition: '1st', otherChords: ''},
    {name: 'D major', alt: 'A picture of a D Major chord', image: '', key: 'Major', keyPosition: '1st', otherChords: ''},
    {name: 'D sharp major', alt: 'A picture of a D# Major chord', image: '', key: 'Major', keyPosition: '1st', otherChords: ''},
    {name: 'E major', alt: 'A picture of an E Major chord', image: '', key: 'Major', keyPosition: '1st', otherChords: ''},
    {name: 'F major', alt: 'A picture of an F Major chord', image: '', key: 'Major', keyPosition: '1st', otherChords: ''},
    {name: 'F sharp major', alt: 'A picture of an F# Major chord', image: '', key: 'Major', keyPosition: '1st', otherChords: ''},
    {name: 'G major', alt: 'A picture of a G Major chord', image: '', key: 'Major', keyPosition: '1st', otherChords: ''},
    {name: 'G sharp major', alt: 'A picture of a G# Major chord', image: '', key: 'Major', keyPosition: '1st', otherChords: ''},
    {name: 'A minor', alt: 'A picture of an A minor chord', image: '', key: 'Minor', keyPosition: '1st', otherChords: ''},
    {name: 'A sharp minor', alt: 'A picture of an A# Minor chord', image: '', key: 'Minor', keyPosition: '1st', otherChords: ''},
    {name: 'B minor', alt: 'A picture of a B Minor chord', image: '', key: 'Minor', keyPosition: '1st', otherChords: ''},
    {name: 'C minor', alt: 'A picture of a C Minor chord', image: '', key: 'Minor', keyPosition: '1st', otherChords: ''},
    {name: 'C sharp minor', alt: 'A picture of a C# Minor chord', image: '', key: 'Minor', keyPosition: '1st', otherChords: ''},
    {name: 'D minor', alt: 'A picture of a D Minor chord', image: '', key: 'Minor', keyPosition: '1st', otherChords: ''},
    {name: 'D sharp minor', alt: 'A picture of a D# Minor chord', image: '', key: 'Minor', keyPosition: '1st', otherChords: ''},
    {name: 'E minor', alt: 'A picture of an E Minor chord', image: '', key: 'Minor', keyPosition: '1st', otherChords: ''},
    {name: 'F minor', alt: 'A picture of a F Minor chord', image: '', key: 'Minor', keyPosition: '1st', otherChords: ''},
    {name: 'F sharp minor', alt: 'A picture of a F# Minor chord', image: '', key: 'Minor', keyPosition: '1st', otherChords: ''},
    {name: 'G minor', alt: 'A picture of a G Minor chord', image: '', key: 'Minor', keyPosition: '1st', otherChords: ''},
    {name: 'G sharp minor', alt: 'A picture of an G# Minor chord', image: '', key: 'Minor', keyPosition: '1st', otherChords: ''}
  ];
}
