import {BackgroundUrlPipe} from '../../../lib/pipes/strings/background.url.pipe';

describe('Pipe: BackroundUrlPipe', () => {
    let pipe: BackgroundUrlPipe;

    beforeEach(() => pipe = new BackgroundUrlPipe());

    it('gives a valid css "background-image" value from a given string', () => {
        expect(pipe.transform('http://hostname/path/to/remote/avatar.jpg')).toBe('url(http://hostname/path/to/remote/avatar.jpg)');
    });
});
