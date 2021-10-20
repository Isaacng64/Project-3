### UI Piano Documentation:

The UI Piano consists of one main component (PianoFitoctaves) wich holds three child components, Key, Octaves Layout and AudioPlayer.

Please note that AudioPlayer documentation will be held in the AudioPlayer documentation, the Audio PLayer "has the main responsibility of receiving calls to actually play sound samples, and playing them."

#### Components and Classes:


##### Key Component:
		
		
		The Key component is a child component for PianoFitOctaves. Main responsability it so create a visual piano key as 
		a hyper link in a div. When the key is clicked the key component will dispatch a custom event, whos details will 
		contain information of the key click
    
    methods: 
    	clickHandler():  
			handles an onclick event, recives the componentkey variable to determine which piano key is clicked, 
			and returns a custom event's event detail which includes all key information stored in PianoNotes 
			for that key.
    
  ##### OctavesLayout Component:
		
		
		The OctavesLayout component is another child component for the PianoFitOctaves which will show the UI for 
		the Octave.
    
  ##### PianoFitOctaves Component:
		
		
		The PianoFitOctaves (First called PianoInstrument) component, is the second version which handles only 3 
		Piano Octaves, due to space requirements, and can adjust which octave the user wants to use with the use of 
		two buttons which call the addOctave and decreaseOctave methods. The PianoFitOctaves uses a div to containe 
		all keys, and a for:each to generate each key for the piano with the assistance of the key child component 
		and the PianoNote component. On click the PianoFitOctave will recieve event details, and procede to use the 
		the event details to interact with Audioplayer package.  
		
	methods: 
		addOctave(): 
			when the addOctave method is called a variable called numOctave will first be checked to insure that
			the maximum octave shown is the 7th octave. Afther numOctave is checked, if valid, the variables 
			numOctave, octaveZero, octaveOne, and octaveTwo are increased by 1 and the variables firstKey and 
			lastKey are increased by 12. the piano div is then updated to all keys with in the newly displayed 
			octaves.
		
		decreaseOctave(): 
			when the decreaseOctave method is called a variable called numOctave will first be checked to insure 
			that the minimum octave shown is the 1st octave. Afther numOctave is checked, if valid, the variables 
			numOctave, octaveZero, octaveOne, and octaveTwo are decrease by 1 and the variables firstKey and lastKey
			are decrease by 12. the piano div is then updated to all keys with in the newly displayed octaves.
		
		handleKeyClickCE(evt): 
			In the event handler, when a piano key is clicked all associated data for that key is sent from the key 
			component as event details (evt.detail) and broken up into variables note, name, and octave. 
		
    
  ##### PianoNotes helper:
  	
	The PianoNotes contains an large array, in each element of the array contain uniqe data for each piano key. This array 
	was created as a seperate JS file to improve code readability.
