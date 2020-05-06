import {FromNumberToArrayPipe} from '@everyup/pipes/numbers/as.array.pipe';

describe('Pipe: FromNumbersToArray', () => {
    let pipe: FromNumberToArrayPipe;

    beforeEach(() => pipe = new FromNumberToArrayPipe());

    it('convert number 5 to an array 5 length', () => {
        expect(pipe.transform(5).length).toEqual(5);
    });

    it('convert number 0 to an empty array', () => {
        expect(pipe.transform(0).length).toEqual(0);
    });
});
