### UI Piano Documentation:

The UI Piano consists of one main component (PianoFitoctaves) wich holds three child components, Key, Octaves Layout and AudioPlayer.

Please note that AudioPlayer documentation will be held in the AudioPlayer documentation, the Audio PLayer "has the main responsibility of receiving calls to actually play sound samples, and playing them."

#### Components and Classes:


##### Key Component:
		
		 #talk about properties of the class and its construction here before api exposed methods
		
		The Key component is a child component for PianoFitOctaves. Main responsability it so create a visual piano key as a 
		hyper link in a div. When the key is clicked the key component will dispatch a custom event, whos details will 
		contain information of the key click
    
    methods: 
    
    	clickHandler():  
		handles an onclick event, recives the componentkey variable to determine which piano key is clicked, and returns a 
		custom event's event detail which includes all key information stored in PianoNotes for that key.
    
  ##### OctavesLayout Component:
		
		#talk about properties of the class and its construction here before api exposed methods
		
		The OctavesLayout component 
    
  ##### PianoFitOctaves Component:
		
		#talk about properties of the class and its construction here before api exposed methods
		
		The PianoFitOctaves (First called PianoInstrument) component, is the second version which hadle only 3 Piano Octaves, this due to space requirements. 
    
  ##### PianoNotes helper:
