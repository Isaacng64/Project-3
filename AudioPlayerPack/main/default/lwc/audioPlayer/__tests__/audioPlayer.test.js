import { createElement } from 'lwc';
import AudioPlayer from 'c/audioPlayer';
import { AudioPlayerNote } from '../../commonUtils/audioPlayerNote';

/* Most testing is really on the commonUtils for the AudioPlayerNote which the AudioPlayer relies heavily on */

describe('c-audio-player', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Test currently playing list', () => {

        const element = createElement('c-audio-player', {
            is: AudioPlayer
        });

        document.body.appendChild(element);

        element.playGuitar("A", 5, 1);
        expect(element.getCurPlaying().length).toBe(1);
        element.playGuitar("A", 5, 1);
        expect(element.getCurPlaying().length).toBe(2);

    });

    it('Test duration ticking down', () => {

        const element = createElement('c-audio-player', {
            is: AudioPlayer
        });

        document.body.appendChild(element);

        element.playGuitar("A", 5, 5);
        expect(element.getCurPlaying()[0].remainingBeats).toBe(5);
        element.tickCallback(0.1);
        expect(element.getCurPlaying()[0].remainingBeats).toBe(4);
        element.tickCallback(0.1);
        expect(element.getCurPlaying()[0].remainingBeats).toBe(3);
        element.tickCallback(0.1);
        expect(element.getCurPlaying()[0].remainingBeats).toBe(2);
        element.tickCallback(0.1);
        expect(element.getCurPlaying()[0].remainingBeats).toBe(1);
        element.tickCallback(0.1);
        expect(element.getCurPlaying()[0].remainingBeats).toBe(0);

        expect(element.getCurPlaying().length).toBe(1);
        element.tickCallback(0.1);
        expect(element.getCurPlaying().length).toBe(0);

    });

    it('Test play - no duration specified', () => {

        const element = createElement('c-audio-player', {
            is: AudioPlayer
        });

        document.body.appendChild(element);

        element.playPianoInteger(5); /* testing that duration unentered is interpreted as null and handled properly, 25 is the default in playerWrapper */
        element.playPiano(new AudioPlayerNote(15));
        element.playGuitar("A", 20);

        element.getCurPlaying().forEach((wrapper) =>{
            expect(wrapper.remainingBeats).toBe(25);
        });

        element.tickCallback(0.1);
        element.tickCallback(0.1);
        element.tickCallback(0.1);

        element.getCurPlaying().forEach((wrapper) =>{
            expect(wrapper.remainingBeats).toBe(22);
        });
    });

    it('Test stop playing when duration runs out', () => {

        const element = createElement('c-audio-player', {
            is: AudioPlayer
        });

        document.body.appendChild(element);

        element.playGuitar("A", 5, 2);

        element.tickCallback(0.1);
        element.tickCallback(0.1);

        let pRef = element.getCurPlaying()[0];
        expect(pRef.isStillPlaying()).toBe(true);
        element.tickCallback(0.1);
        expect(pRef.isStillPlaying()).toBe(false);
        expect(element.getCurPlaying().length).toBe(0);
    });
});