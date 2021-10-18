
import {arrayRemove} from '../generalHelper';

describe('tests of generalHelper and other js files in audioPlayer', () => {

    it('Test array remove', () => {

        let a = [23,55,11,0,1];

        expect(a.length).toBe(5);

        let a2 = arrayRemove(a, 0);

        expect(a2.length).toBe(4);

    });

    it('Test array remove 2', () => {

        let a = [23,55,11,0,1];

        expect(a.includes(11)).toBe(true);

        let a2 = arrayRemove(a, 11);

        expect(a2.includes(11)).toBe(false);

    });

});