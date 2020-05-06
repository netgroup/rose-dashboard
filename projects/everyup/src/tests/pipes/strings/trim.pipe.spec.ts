import {TrimPipe} from '../../../lib/pipes/strings/trim.pipe';

describe('Pipe: TrimPipe', () => {
    let pipe: TrimPipe;

    beforeEach(() => pipe = new TrimPipe());

    it('trims blank spaces from a given string', () => {
        expect(pipe.transform('   this is a simple string   ')).toBe('this is a simple string');
    });

    it('trims "sample" string from a given one', () => {
        expect(pipe.transform('this is a simple string', 'simple')).toBe('this is a string');
    });
});
