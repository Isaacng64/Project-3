AudioPlayerPackage Documentation:

The AudioPlayerPackage consists of three central components: the AudioPlayer, Metronome, and the Autoplayer. The way we preview these for development 
is using the Soundboard component, which is mostly a container to facilitate communication between the components as needed for certain functionality.

Components and Classes:

	AudioPlayer:
		
		 #talk about properties of the class and its construction here before api exposed methods
		
		The AudioPlayer has the main responsibility of receiving calls to actually play sound samples, and playing them. It is constructed with
		the help of the audio-builder helper file. The audio-builder fills the dictionaries (passed by ref.) of the AudioPlayer with PlayerWrappers,
		for each note of each instrument. The fully constructed dictionaries are organized by instrument, and then by that instrument's file structure
		in the static resources.
		
		methods:
			
			playPianoInteger(i : int, duration : int):
				Plays a single note on the piano, with 0 being the lowest note. Duration is optional, but will specify a number of metronome-ticks
				after which to terminate the sound, rather than letting it ring out own its own.
				
			playPiano(playerNote : AudioPlayerNote&, duration : int):
				Plays a single note on the piano, that note specified by the AudioPlayerNote passed to it. Duration is optional, but will specify a number of metronome-ticks
				after which to terminate the sound, rather than letting it ring out own its own.
				
			playGuitar(string_name : string, fret : int, duration : int):
				Plays a single note on the guitar, by combination of a string and fret. Duration is optional, but will specify a number of metronome-ticks
				after which to terminate the sound, rather than letting it ring out own its own.
				
			playBass(string_name : string, fret : int, duration : int):
				Plays a single note on the bass, by combination of a string and fret. Duration is optional, but will specify a number of metronome-ticks
				after which to terminate the sound, rather than letting it ring out own its own.
			
			tickCallback(tickVolume : float):
				Gets called every time the Metronome ticks a main tick (not sub-tick), and should not be called manually. This happens if the Metronome 
				tick event is caught in a container such as Soundboard and routed down to call tickCallback.
			
	AudioPlayerNote:
	
		The AudioPlayerNote is used to tell the AudioPlayer what note to play accurately, as it can be constructed in a variety of flexible ways.
		
		properties:
			name:
				The string of the note name to play in only-flat notation, such as "A", "Gb", "F", etc. There will never be a # (sharp) in the name here,
				because of the way we load the piano sound samples.
			
			octave:
				An integer value of the octave the note should be played in. 
			
			valid:
				Turns true after construction if it was successfuly constructed, and allows the player to ignore it if it would be invalid to play.
				Construction throws an exception if it's not valid, so this should never actually be seen as invalid unless the exception is caught
				and ignored.
		
		valid constructor invocations of AudioPlayerNote(offset_integer : int, name_string : string, octave_integer : int, std_note_string : string):
		
			-new AudioPlayerNote(offset_integer : int)
			
			-new AudioPlayerNote(offset_integer : int or null, name_string : string, octave_integer : int)
			
			-new AudioPlayerNote(offset_integer : int or null, null, null, std_note_string : string)
			
			-new AudioPlayerNote(offset_integer : int or null, name_string : string)
			
			If invoked with an offset and no 'base note' via the name-octave pair or standard notation note, then 0 will return the lowest note of
			the piano. Otherwise, the offset will make it return the note an offset number of half-steps above the specified base note.
			
	MusicHelper:
		
		A bundle of helper functions used to help clean and validate inputs, and do some music math.
		
		sharp2flat(name: string):
			Takes a note such as "c#" and returns "Db". Yes, it makes the case consistent like that.
			
		offset2note(relOffset : int, octave : int, name : string):
			Used mainly by AudioPlayerNote in construction, accounts for the base note specified and an offset number of half-steps taken above it to
			return a dictionary with the new note name and octave.
			
		stdNote2components(stdNote : string):
			A Standard Note is what we've been referring to such as "G5" or "Db3", to mean "fifth octave G" and "third octave D-flat" respectively. This
			function will take a note specified as such a string, and return it broken into a dictionary of components, having the name and octave separate.
			
		note2freq({octave : int, name : string}):
			Used experimentally with the frequencyExplorer and TonePlayer components to construct synthethized audio players instead of using samples. Is 
			not in active use, but it would return a fundamental frequency in Hz of the note specified.
			
	PlayerWrapper:
	
		Used to wrap stock HTML5 Audio objects as well as experimentally TonePlayer objects, to provide a clean interface to the AudioPlayer.
		
		properites:
			player:
				The Audio player object.
			
			remainingBeats:
				The remaining number of metronome ticks that this should still play sound for.
				
		methods:
			constructor(player : Audio or TonePlayer):
				Must be constructed with a valid Audio object.
				
			stop():
				Stops the sound from playing.
				
			play(beats : int):
				Begins the sound playing for the duration of beats if specified, otherwise will just play the entire sound sample until manually stopped.
				
			clockCallback():
				Called by the AudioPlayer which keeps track of its currently-playing objects. This decrements the remaining beats it has left, and will
				stop it from playing if the remaining beats run out.
				
	AudioBuilder:
		A collection of builder functions to construct AudioPlayer. Keeps track of the salesforce static resource paths.
		
		buildLocalAudioPlayers(dictAuto : Object&, dictManual : Object&):
			Fills the objects with all of the Piano sounds with sub-objects by Octave and then by Note.
			
		buildLocalGuitarPlayers(dictAuto : Object&, dictManual : Object&):
			Fills the objects with all of the Guitar sounds with sub-object by String and then an array by Fret.
			
		buildLocalBassPlayers(dictAuto : Object&, dictManual : Object&):
			Fills the objects with all of the Guitar sounds with sub-object by String and then an array by Fret.
			
	beatPatternUi:

		Used to control the volumes of each beat for the metronome through a UI component.
		
		properites:
			beatsTotal:
				Total number of beats per measure in the current interface.
			
			volumesList:
				Linear decimal array for the volume of each beat as a fraction of 0 to 1.
				
		methods:
				
			getBeatsTotal():
				Getter for beatsTotal.
				
			setBeatsTotal(num):
				Setter for beatsTotal.
				
			getTempList():
				Getter for volumesList, used in at least the metronome component if you'd like to rename.
				
			play(beats : int):
				Begins the sound playing for the duration of beats if specified, otherwise will just play the entire sound sample until manually stopped.
				
			clickVolumesHandler(event):
				Handler for when the beat visual is clicked. Determines the index of the beat that's been clicked, calls louder() to increment it's volume by 0.25, then resizes the inner div for the beat to match the volume (after checking whether the inner or outer div was the target of the event).
				
			louder(current):
				Increments the volume of the 'current' index of volumesList by 0.25, and resets it to 0 if it exceeds 1.
				
			resize(element, num):
				Resizes the div defined by 'element' to the fraction defined by 'num'.
				
			changeUpdateEvent():
				Fires an event to the parent when a change is made to volumesList.
				
			resizeVolumesList(num):
				Creates a temporary list of length 'num', starting with the contents of volumesList and filling any remaining space with 0.25. Then replaces volumesList with the temporary list.
				
			highlightBeat(toHighlight):
				Edits the class of the inner div for the specifed beat to 'highlighted', and changes the other inner divs to 'unhighlighted'. Called by the parent component.
				
	metronome:

		Used to call an audio file through audioPlayer for metronome ticks at regular interval. Also dispatches events to control timing for autoplayer and songbuilder.
		
		properites:
			intervalObj:
				Object holding the interval for setTempo.
			
			bpm:
				Current beats per minute.
				
			currentVolume:
				Volume to pass to the audioPlayer.
				
			metroCounter:
				Current beat (starts with 1).
				
			counterMax:
				Current maximum beats (corresponds to beatsTotal on beatPatternUi).
				
			counterMaxLocked:
				Boolean determining whether the controls for number of beats load for the user. Controls will load if false, will be hidden if true.
				
			currentSubBeat:
				Current quarter of a beat to send to the songbuilder. Ranges from 1 to 4.
				
			active:
				Boolean determining whether metronome is currently outputting ticks.
				
			muted:
				Boolean determining whether the volume of ticks is set to zeroe before audio is called.
				
			mutedString:
				String variable to display on the mute button. Set to 'Mute' when muted == false, or 'Unmute' when muted = true.
				
		methods:
			constructor():
				Sets the current bpm to 160.
				
			setTempo(bpm):
				Updates bpm to the input an binds subTick() do an interval equal to the a quarter of the interval between beats at the specified bpm.
				
			subTick():
				Increments currentSubTick by 1, cycles back to 1 if it exceeds 4, then dispatches a 'subtick' event for the songbuilder. Calls selfTick() when currentSubTick reaches 1.
				
			selfTick():
				Increments metroCounter by 1, cycles back to 1 if it exceeds counterMax. Calls highlightBeat on the beatPatternUi component for the current beat (metroCounter - 1), then sets currentVolume to the volume retrieved for the beat in beatPatternUi via getTempList(). Finally dispatches a 'tick' event with currentVolume as the sole detail. This event is handled to play metronome ticks and trigger the autoplayer.

			bpm2ms(bpm):
				Converts a beats per minute input into a time interval output in miliseconds.
				
			faster(), faster10(), slower(), slower10():
				Increments or decrements bpm by either 1 or 10.
				
			moreBeats(), lessBeats(), editBeats(num):
				Adjust counterMax, either by 1 or to a specified number, as long as it remains in the range of 0 to 7 inclusive, then passes it to the beatPatternUi component via setBeatsTotal().
				
			toggleMute():
				Toggles 'muted' and sets mutedString to the opposite to display on the toggle button.
				
			start():
				Sets the metronome to active, resets metroCounter and currentSubBeat to 0, then calls setTempo to start the metornome.
				
			stopMetronome():
				Sets the metronome to false. Named differently from start() because 'stop' is a reserved keyword.
	Soundboard:
	
		A container component for the Metronome, AudioPlayer and Autoplayer. It has no exposed methods but serves as the functional example of how
		the components can work together. 
				
			
