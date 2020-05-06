import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'trim' })
export class TrimPipe implements PipeTransform {
    transform(string: string, character: string = ' '): string {
        switch (character) {
            case ' ':
                return string.trim();

            default:
                return string.replace(character, '').replace(/\s\s+/g, ' ');
        }
    }
}
