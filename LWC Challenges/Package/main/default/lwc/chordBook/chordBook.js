import { LightningElement } from "lwc";

export default class App extends LightningElement {
/* Initializes the templates for each instrument to not display by default */
  guitarActive  = true;
  bassActive    = false;
  pianoActive   = false;

/* Functions changing what the active instrument is, and deactivating inactive ones */
/* Maybe in the future there could be a drop down list of chord books for the user to pick from? */
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
    
  activateBass(/*something passed in from parent*/){
    guitarActive  = false;
    bassActive    = false;
    pianoActive   = true;
  }
/* End of instruments function */

/* function to handle the mouseover functinality to dislay more information about the chords*/
  handleMO(){
    
  }

/* These functions handle the currently "active" chord and add a class to it to make it stand out more */
  renderedCallback(){
    let imgs = this.template.querySelectorAll('img');
    for(let i = 0; i < imgs.length; i++){

      if(i == Math.floor(imgs.length/7)){
        imgs[i].classList.add('focus-on-me');
      }
    }
  }

/* These functions handle the buttons to adjust the "active" chord, moving it left and right */
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

/* These arrays just hold information for each of the instruments, currently the index is only used for the key in the iteration template, 
   but that can probably be changed to the name after everything is done, it's currently just leftover from previous iterations */
    guitarChords = [
      {name: "A picture of an E Major chord", image: "https://www.chordword.com/wp-content/uploads/2017/12/E-Major.png", index: 1, key: "Major"},
      {name: "A picture of an E Minor Chord", image: "https://lifein12keys.com/wp-content/uploads/2019/06/E-minor-guitar-chord.png", index: 2, key: "Minor"},
      {name: "A picture of an d Minor Chord", image: "https://www.chordword.com/wp-content/uploads/2017/12/E-Major.png", index: 3, key: "Major"},
      {name: "A picture of an s Minor Chord", image: "https://www.chordword.com/wp-content/uploads/2017/12/E-Major.png", index: 4, key: "Minor"}, 
      {name: "A picture of an a Minor Chord", image: "https://www.chordword.com/wp-content/uploads/2017/12/E-Major.png", index: 5, key: "Major"},
      {name: "A picture of an a Minor Chord", image: "https://www.chordword.com/wp-content/uploads/2017/12/E-Major.png", index: 6, key: "Minor"},
      {name: "A picture of an a Minor Chord", image: "https://www.chordword.com/wp-content/uploads/2017/12/E-Major.png", index: 7, key: "Major"},
      {name: "A picture of an a Minor Chord", image: "https://www.chordword.com/wp-content/uploads/2017/12/E-Major.png", index: 8, key: "Minor"},
      {name: "A picture of an a Minor Chord", image: "https://www.chordword.com/wp-content/uploads/2017/12/E-Major.png", index: 9, key: "Major"},
      {name: "A picture of an a Minor Chord", image: "https://www.chordword.com/wp-content/uploads/2017/12/E-Major.png", index: 10, key: "Minor"},
      {name: "A picture of an a Minor Chord", image: "https://www.chordword.com/wp-content/uploads/2017/12/E-Major.png", index: 11, key: "Major"},
      {name: "A picture of an a Minor Chord", image: "https://www.chordword.com/wp-content/uploads/2017/12/E-Major.png", index: 12, key: "Minor"},
      {name: "A picture of an a Minor Chord", image: "https://www.chordword.com/wp-content/uploads/2017/12/E-Major.png", index: 13, key: "Major"},
      {name: "A picture of an a Minor Chord", image: "https://www.chordword.com/wp-content/uploads/2017/12/E-Major.png", index: 14, key: "Minor"},
      {name: "A picture of an a Minor Chord", image: "https://www.chordword.com/wp-content/uploads/2017/12/E-Major.png", index: 15, key: "Major"},
      {name: "A picture of an a Minor Chord", image: "https://www.chordword.com/wp-content/uploads/2017/12/E-Major.png", index: 16, key: "Minor"},
      {name: "A picture of an a Minor Chord", image: "https://www.chordword.com/wp-content/uploads/2017/12/E-Major.png", index: 17, key: "Major"},
      {name: "A picture of an a Minor Chord", image: "https://www.chordword.com/wp-content/uploads/2017/12/E-Major.png", index: 18, key: "Minor"},
      {name: "A picture of an a Minor Chord", image: "https://www.chordword.com/wp-content/uploads/2017/12/E-Major.png", index: 19, key: "Major"},
      {name: "A picture of an a Minor Chord", image: "https://www.chordword.com/wp-content/uploads/2017/12/E-Major.png", index: 20, key: "Minor"}
    ]

  bassChords = [

  ]

  pianoChords = [
    
  ]
}
