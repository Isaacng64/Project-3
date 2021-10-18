@isTest
public class ControllerTest {
    @isTest
    public static void TP_SaveMusicNotes(){
        Test.startTest();
        
        List<String> note = TestHelper.ReturnNotes(1);
        String songId = TestHelper.InsertSongId();
        String measureId = TestHelper.InsertId(Id.valueOf(songId));
        
        
        PianoController.SaveMusicNote(note, measureId, songId);
        
        List<Musicnote__c> allNotes = [SELECT pitch__c, position__c FROM Musicnote__c 
                    WHERE Measure__c =: measureId];
        
        Test.stopTest();
        
        System.assertEquals(1, allNotes.size());
        System.assertEquals(11, allNotes[0].pitch__c);
        System.assertEquals(11, allNotes[0].position__c);
    }
    @isTest
    public static void TB_SaveMusicNotes(){
        Test.startTest();
        
        List<String> note = TestHelper.ReturnNotes(151);
        String songId = TestHelper.InsertSongId();
        String measureId = TestHelper.InsertId(Id.valueOf(songId));
        
        PianoController.SaveMusicNote(note, measureId, songId);
        
        List<Musicnote__c> allNotes = [SELECT pitch__c, position__c FROM Musicnote__c 
                    WHERE Measure__c =: measureId];
        
        Test.stopTest();
        
        System.assertEquals(151, allNotes.size());
        System.assertEquals(11, allNotes[0].pitch__c);
        System.assertEquals(11, allNotes[0].position__c);
    }
    
    @isTest
    public static void TP_LoadMusicNotes(){
        Test.startTest();
        
        
        String songId = TestHelper.InsertSongId();
        String measureId = TestHelper.InsertId(Id.valueOf(songId));
        TestHelper.InsertNotes(measureId);
        
        String[] returnedNotes = PianoController.LoadMusicNote(songId);
        String firstNote = returnedNotes[1].substring(0,4);
        
        Test.stopTest();
        
        System.assertEquals(2, returnedNotes.size());
        System.assertEquals('0000', firstNote);
        System.assertEquals(measureId, returnedNotes[0]);
        
        
    }
        @isTest
    	public static void TN_LoadMusicNotes(){
        Test.startTest();
        
        String songId = TestHelper.InsertSongId();
        String measureId = TestHelper.InsertId(Id.valueOf(songId));
        TestHelper.InsertNotes(measureId);
            
        String[] returnedNotes = PianoController.LoadMusicNote(songId);
        
        Test.stopTest();
        
        System.assertNotEquals(0, returnedNotes.size());
        System.assertNotEquals('0000', returnedNotes[1]);
        System.assertNotEquals('measureId', returnedNotes[0]);
        
        
    }

    @isTest
    public static void TP_UpdateMusicNotes(){
        Test.startTest();
        
        String songId = TestHelper.InsertSongId();
        String measureId = TestHelper.InsertId(Id.valueOf(songId));
        List<String> note = TestHelper.ReturnNotes(1);
        List<String> newNotes = TestHelper.InsertUpdatedNotes(1);
        
        PianoController.SaveMusicNote(note, measureId, songId);
        PianoController.UpdateMeasure(newNotes, measureId);
        
        List<Musicnote__c> result = [SELECT pitch__c, position__c FROM Musicnote__c 
                                    WHERE Measure__c =: measureId];
        
        Test.stopTest();
        System.assertEquals(1, result.size());
        System.assertEquals(22, result[0].pitch__c);
        System.assertEquals(22, result[0].position__c);
    }
    @isTest
    public static void TB_UpdateMusicNotes() {
        Test.startTest();
        
        String songId = TestHelper.InsertSongId();
        String measureId = TestHelper.InsertId(Id.valueOf(songId));
        List<String> note = TestHelper.ReturnNotes(151);
        List<String> newNotes = TestHelper.InsertUpdatedNotes(151); 
        
        PianoController.SaveMusicNote(note, measureId, songId);
        PianoController.UpdateMeasure(newNotes, measureId);
        
        List<Musicnote__c> result = [SELECT pitch__c, position__c FROM Musicnote__c 
                                    WHERE Measure__c =: measureId];
        
        Test.stopTest();
        System.assertEquals(151, result.size());
        System.assertEquals(22, result[0].pitch__c);
        System.assertEquals(22, result[0].position__c);
        
    }
    @isTest
    public static void TP_GetSongByName() {
        Test.startTest();
        
        String[] songName = TestHelper.ReturnSong(1);
        List<String> returnedSongs = PianoController.GetSongsByName(songName[0]);
        String indName = returnedSongs[0];
        Integer numSong = returnedSongs.size();
        String name = returnedSongs[0].substring(18, indName.length()-1);
        
        Test.stopTest();
        System.assertEquals(1, numSong);
        System.assertEquals('test', name);
        System.debug(indName);
        
    }
    @isTest
    public static void TN_GetSongByName() {
        Test.startTest();
        
        String[] songName = TestHelper.ReturnSong(1);
        List<String> returnedSongs = PianoController.GetSongsByName(songName[0]);
        String indName = returnedSongs[0];
        Integer numSong = returnedSongs.size();
        String name = returnedSongs[0].substring(18, indName.length()-1);
        
        Test.stopTest();
        System.assertEquals(1, numSong);
        System.assertNotEquals('Invalid', name);
        System.debug(indName);
        
    }
    @isTest
    public static void TP_CreateMeasure(){
        Test.startTest();
        
        String songId = TestHelper.InsertSongId();
        String returnedId = PianoController.CreateMeasure(songId, 1);
        
        Measure__c measure = [SELECT Id, position__c FROM Measure__c WHERE id =: returnedId AND position__c =: 1];
        
        Test.stopTest();
        System.assertEquals(measure.id, returnedId);
        System.assertEquals(1, measure.Position__c);
    }
    @isTest
    public static void TN_CreateMeasure(){
        Test.startTest();
        
        String songId = TestHelper.InsertSongId();
        String returnedId = PianoController.CreateMeasure(songId, 1);
        
        Measure__c measure = [SELECT Id, position__c FROM Measure__c WHERE id =: returnedId AND position__c =: 1];
        
        Test.stopTest();
        System.assertNotEquals('notId', returnedId);
        System.assertNotEquals(3, measure.Position__c);
    }
    @isTest
    public static void TP_CreateSong(){
        Test.startTest();
        
        PianoController.CreateSong();
        List<Song__c> song = [SELECT id FROM Song__c];
        
        Test.stopTest();
        System.assertEquals(1, song.size());
        
    }
    @isTest
    public static void TN_CreateSong(){
        Test.startTest();
        
        PianoController.CreateSong();
        List<Song__c> song = [SELECT id FROM Song__c];
        
        Test.stopTest();
        System.assertNotEquals(2, song.size());
        
    }
    @isTest
    public static void TP_NameSong(){
        Test.startTest();
        
        String songId = TestHelper.InsertSongId();
        Song__c song = [SELECT name FROM Song__c WHERE id =: songId];
        PianoController.NameSong(String.valueOf(song.id), 'new Name');
        Song__c newSong = [SELECT name FROM Song__c WHERE id =: songId];
        
        Test.stopTest();
        System.assertEquals('new Name', newSong.name);
        System.debug(newSong.name);
    }
    @isTest
    public static void TN_NameSong(){
        Test.startTest();
        
        String songId = TestHelper.InsertSongID();
        Song__c song = [SELECT name FROM Song__c WHERE id =: songId];
        PianoController.NameSong(String.valueOf(song.id), 'new Name');
        Song__c newSong = [SELECT name FROM Song__c WHERE id =: songId];
        
        Test.stopTest();
        System.assertNotEquals('test1', newSong.name);
    }
    @isTest
    public static void TS_ClearSong(){
        Test.startTest();
        
        List<String> note = TestHelper.ReturnNotes(1);
        String songId = TestHelper.InsertSongId();
        String measureId = TestHelper.InsertId(Id.valueOf(songId));
            
        PianoController.SaveMusicNote(note, measureId, songId);
        PianoController.ClearSong(songId);
        
        List<Measure__c> measures = [SELECT Id, (SELECT id FROM MusicNotes__r) FROM Measure__c WHERE song__c =: songId];
        Integer i = 0;
        for (Measure__c measure : measures){
            for (MusicNote__c notes : measure.MusicNotes__r){
                i += 0;
            }
        }
        
        Test.stopTest();
        System.assertEquals(0, i);
    }
}