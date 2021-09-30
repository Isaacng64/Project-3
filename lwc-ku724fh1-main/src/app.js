import { LightningElement,track } from "lwc";



export default class App extends LightningElement {
   

 // create instances of elements that have events
 btnToggle="Hide";
 showchamplist=true;
 addInput="You think the champion will be: ";
 // user input variable
   userInput;
 // populate the list with the name and image of the champions from 2017-2020, 2021 season is stil ongoing
 champList=[{name:"Martin Truex Jr", Image:"https://en.wikipedia.org/wiki/Martin_Truex_Jr.#/media/File:Martin_truex_jr._(48681186172).jpg"},
 {name:"Joey Logano", Image:"https://www.nascar.com/wp-content/uploads/sites/7/2021/04/15/1_2021_JoeyLogano_550x440.png"},
 {name:"Kyle Bush", Image:"https://a.espncdn.com/combiner/i?img=/i/headshots/rpm/players/full/580.png&w=350&h=254"},
 {name: "Chase Elliot", Image:"https://a.espncdn.com/combiner/i?img=/i/headshots/rpm/players/full/4574.png&w=350&h=254"}];
 
 // track the list
 @track
 theList=["...champList"];
 // method/function placement
 toggle()
 {
   this.showchamplist=!this.showchamplist;
   btnToggle=(this.showChampList ? "Show" :"Hide");

 }
 handleChange(event)
 {
   this.userInput=event.target.value;
   //window.alert(this.userInput);

 }
 addToList(userInput)
 {
   let input="Tomato";
   input =this.userInput;
   this.champList.push(input);
window.alert(input);
 }

}

