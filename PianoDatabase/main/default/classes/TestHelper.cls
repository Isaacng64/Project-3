@isTest
public class TestHelper {
    /**
     * Mock data for notes, returns the list of string with the size that was taken in as the parameter.
     **/
    
    public static List<String> ReturnNotes(Integer num){

        List<String> returnList = new List<String>();
        
        for (Integer i = 0; i < num; i++){
            returnList.add('1111');
        }
        
        return returnList;
    }
    /**
     * Mock data for notes, insert the list of string with the size that was taken in as the parameter.
     **/
    public static void InsertNotes(String currMeasureId){
        List<MusicNote__c> toInsert = new List<MusicNote__c>();
        for (Integer i = 0; i < 16; i++){
            toInsert.add(new MusicNote__c(position__c = i, pitch__c = i, measure__c = currMeasureId));
        }
        Insert toInsert;
    }
    
    /**
     * Mock data for updated notes, returns the list of string with the size that was taken in 
     * as the parameter.
     **/
    
    public static List<String> InsertUpdatedNotes(Integer num){
        List<String> returnList = new List<String>();
        
        for (Integer i = 0; i < num; i++){
            returnList.add('2222');
        }
        
        return returnList;
    }
    
    /**
     * Mock data for measure, returns the id of measure.
     **/
    public static String InsertId(Id songId){
        Measure__c measure = new Measure__c(song__c = songId);
        Insert measure;
        return String.valueOf(measure.id);
    }
    /**
     * Mock data for song, returns the id of song.
     **/
    public static String InsertSongId(){
        song__c song = new Song__c(name = 'test');
        Insert song;
        return String.valueOf(song.Id);
    }
    /**
     * Mock data for measure, relates the measure with a song and returns the id of measure.
     **/
    public static Id InsertIdWithSong(){
        Song__c song = new Song__c(name = 'test');
        Insert song;
        
        Measure__c measure = new Measure__c(Song__c = song.id);
        Insert measure;
        
        Musicnote__c note = new Musicnote__c(pitch__c = 11, position__c = 11, Measure__c = measure.id);
        Insert note;
        
        return String.valueOf(measure.id);
    }
    /**
     * Mock data for finding the song by measures.
     **/
    
    public static List<String> ReturnSong(Integer num){
        List<Song__c> toInsert = new List<Song__c>();
        List<String> toReturn = new List<String>();
        for (Integer i = 0; i < num; i++){
            String songName = 'test' + i;
            toInsert.add(new Song__c(name = songName));
            toReturn.add(songName);
        }
        Insert toInsert;
        
        return toReturn;
    }
}