public class PianoController {
    
    /**
     * This method takes in notes as parameter and returns the first two digits of the string 
     * as pitches.
     **/
    public static List<Decimal> ReturnPitch(List<String> note){
        List<Decimal> pitch = new List<Decimal>();
        
        for (String currNote: note){
            pitch.add(decimal.valueOf(currNote.Substring(0,2)));
        }
        return pitch;
    }
    /**
     * This method takes in notes as parameter and returns the last two digits of the string 
     * as positions.
     **/
    public static List<Decimal> ReturnPosition(List<String> note){
        List<Decimal> position = new List<Decimal>();
        
        for (String currNote: note){
            position.add(decimal.valueOf(currNote.Substring(2,4)));
        }
        return position;
    }
    /**
     * This method creates a new measure and returns the ID.
     **/
    @auraEnabled
    public static String CreateMeasure(String song, Integer pos){
        system.debug('createmeasure called');
        ID songID = ID.valueOf(song);
        
        Measure__c newMeasure = new Measure__c();
        newMeasure.Song__c = songID;
        newMeasure.Position__c = Double.valueOf(pos);
        Insert newMeasure;
        
        String newMeasureID = newMeasure.Id;
        
        return newMeasureID;
    }
    /**
     * This method creates a new song and returns the ID.
     **/
    @auraEnabled
    public static String CreateSong(){
        Song__c newSong = new Song__c();
        Insert newSong;
        
        String newSongID = newSong.Id;
        
        return newSongID;
    }
    /**
     * This method renames a song, given the ID.
     **/
    @auraEnabled
    public static void NameSong(String song, String newName){
        Song__c toRename = [SELECT id, name FROM Song__c WHERE id =: song];
        toRename.Name = newName;
        
        Update toRename;
    }
    /**
     * This method clears all the measures in a song.
     **/
    @auraEnabled
    public static void ClearSong(String song){
        system.debug('clear song entered');
        Id songId = Id.valueOf(song);
        List<Measure__c> measuresToClear = [SELECT id FROM Measure__c WHERE Measure__c.Song__c =: songId];
        List<Musicnote__c> notesToDelete = new List<Musicnote__c>();
        for (Measure__c toClear : measuresToClear){
            List<Musicnote__c> notesInMeasure = [SELECT id FROM Musicnote__c WHERE Musicnote__c.Measure__c =: toClear.Id];
            for (Musicnote__c toDelete : notesInMeasure){
                notesToDelete.add(toDelete);
            }
            toClear.Position__c = 0;
        }
        
        Delete notesToDelete;
    }
    /**
     * The method takes in the Musicnote object's Id and the list of Strings where the first two 
     * positions represents the pitch and last two positions representing the position of the note.
     * It inserts a song that measures will belong to, and fill out the position and pitch fields.
	 */
    @auraEnabled
    public static void SaveMusicNote(List<String> note, String stringId, String song){
        Id measureId = Id.valueOf(stringId);
        Id currSong = Id.valueOf(song);
        system.debug(note);
        List<Decimal> pitch = ReturnPitch(note);
        List<Decimal> position = ReturnPosition(note);
        
        List<Musicnote__c> newNotes = new List<Musicnote__c>();
        
        Measure__c currMeasure = [SELECT position__c FROM Measure__c WHERE id =: measureId]; 
        
        Update currMeasure;

        for (Integer i = 0; i < pitch.size(); i++){
            newNotes.add(new Musicnote__c(pitch__c = pitch[i], 
                                          position__c = position[i], 
                        				  Measure__c = measureId));
            system.debug('' + newNotes[i]);
        }
        Insert newNotes;
    }
    /** 
     * This method takes in the song title and returns the measures and music notes that are
     * related to the song to load.
     **/
    @auraEnabled
    public static String[] LoadMusicNote(String song){
        system.debug('load music notes entered');
        Id songId = Id.valueOf(song);
        Song__c currSong = [SELECT id FROM Song__c WHERE id =: songId];
        List<Measure__c> allMeasures = [SELECT name, position__c 
                                        FROM Measure__c
                                        WHERE song__c =: currSong.id ORDER BY position__c];
        
        system.debug('all measures length: ' + allMeasures.size());
        String[] toReturn = new String[]{};
        for (Measure__c measure : allMeasures){
            toReturn.add(measure.Id + '');
            String notesInMeasure = '';
            for (Musicnote__c note : [SELECT id, pitch__c, position__c FROM Musicnote__c WHERE Musicnote__c.Measure__c =: measure.Id]){
                String pitch;
                if (note.pitch__c < 10){
                    pitch = '0' + note.pitch__c;
                }else{
                    pitch = '' + note.pitch__c;
                }
                String pos;
                if (note.position__c < 10){
                    pos = '0' + note.position__c;
                }else{
                    pos = '' + note.position__c;
                }
                notesInMeasure = notesInMeasure + pitch + pos;
            }
            toReturn.add(notesInMeasure);
        }
        system.debug('toReturn: ' + toReturn);
        return toReturn;
    }
    /**
     * This method takes in Measure object's id and List of String that represents notes
     * and update the notes within the measure with new values.
     **/
    @auraEnabled
    public static void UpdateMeasure(List<String> note, String stringId){
        Id measureId = Id.valueOf(stringId);
        List<Decimal> pitch = ReturnPitch(note);
        List<Decimal> position = ReturnPosition(note);
        
        Measure__c currMeasure = [SELECT id FROM Measure__c where id =: measureId];
        
        List <Musicnote__c> oldNote = [SELECT pitch__c, position__c FROM Musicnote__c 
                                   WHERE Measure__c =: measureId];
        for (Integer i = 0; i < oldNote.size(); i++){
            oldNote[i].pitch__c = pitch[i];
            oldNote[i].position__c = position[i];
        }
        Update oldNote;
        Update currMeasure;
 
    }
//
}