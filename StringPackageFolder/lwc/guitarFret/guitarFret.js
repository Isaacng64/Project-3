import { LightningElement, api } from 'lwc';
import fretImage from '@salesforce/resourceUrl/fret';
import fretPressedImg1 from '@salesforce/resourceUrl/fretPressed1';
import fretPressedImg2 from '@salesforce/resourceUrl/fretPressed2';
import fretPressedImg3 from '@salesforce/resourceUrl/fretPressed3';
import fretPressedImg4 from '@salesforce/resourceUrl/fretPressed4';
import fretPressedImg5 from '@salesforce/resourceUrl/fretPressed5';
import fretPressedImg6 from '@salesforce/resourceUrl/fretPressed6';

export default class GuitarFret extends LightningElement {

  @api fretImg = fretImage;
  @api currentFret;
  @api currentString = 'A';
  @api pressed = false;
  pressedFretImg1 = fretPressedImg1;
  pressedFretImg2 = fretPressedImg2;
  pressedFretImg3 = fretPressedImg3;
  pressedFretImg4 = fretPressedImg4;
  pressedFretImg5 = fretPressedImg5;
  pressedFretImg6 = fretPressedImg6;

  setFret(){
    this.pressed = !this.pressed;
    this.dispatchEvent(new CustomEvent('fretpressed'));
    if(this.pressed == true){
      this.dispatchEvent(new CustomEvent('passfret', {detail: this.currentFret}));
    } else {
      this.dispatchEvent(new CustomEvent('passfret', {detail: 0}));
    }

    if(this.currentString == 'E1' && this.pressed==true){
      this.fretImg = this.pressedFretImg1;
    } else if(this.currentString == 'A' && this.pressed==true){
      this.fretImg = this.pressedFretImg2;
    } else if(this.currentString == 'D' && this.pressed==true){
      this.fretImg = this.pressedFretImg3;
    } else if(this.currentString == 'G' && this.pressed==true){
      this.fretImg = this.pressedFretImg4;
    } else if(this.currentString == 'B' && this.pressed==true){
      this.fretImg = this.pressedFretImg5;
    } else if(this.currentString == 'E2' && this.pressed==true){
      this.fretImg = this.pressedFretImg6;
    } else if(this.pressed == false){
      this.fretImg = fretImage;
    }
  }

}
