import {CapitalizePipe} from '../../../lib/pipes/strings/capitalize.pipe';

describe('Pipe: CapitalizePipe', () => {
    let pipe: CapitalizePipe;

    beforeEach(() => pipe = new CapitalizePipe());

    it('capitalize only the first letter if no transformation type is specified', () => {
        expect(pipe.transform('this is a simple string')).toBe('This is a simple string');
    });

    it('capitalize only the first letter if "sentences" transformation type is specified', () => {
        expect(pipe.transform('this is a simple string', 'sentences')).toBe('This is a simple string');
    });

    it('capitalize all characters if "all" transformation type is specified', () => {
        expect(pipe.transform('this is a simple string', 'all')).toBe('THIS IS A SIMPLE STRING');
    });

    it('capitalize all words if "words" transformation type is specified', () => {
        expect(pipe.transform('this is a simple string', 'words')).toBe('This Is A Simple String');
    });
});
