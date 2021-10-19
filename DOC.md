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

	Soundboard:
	
		A container component for the Metronome, AudioPlayer and Autoplayer. It has no exposed methods but serves as the functional example of how
		the components can work together. 
				
			
