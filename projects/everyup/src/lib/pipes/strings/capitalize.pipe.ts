import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'capitalize' })
export class CapitalizePipe implements PipeTransform {
    transform(text: string, type: string = 'sentences'): string {
        let output = '';

        switch (type) {
            case 'sentences':
                output = this.capitalizeFirstLetter(text);

                break;
            case 'words':
                const partials: string[] = [];

                text.split(' ').forEach(partial => partials.push(this.capitalizeFirstLetter(partial)));
                output = partials.join(' ');

                break;

            case 'all':
                output = text.toLocaleUpperCase();

                break;
        }

        return output;
    }

    private capitalizeFirstLetter(text: string): string {
        return  (text) ? `${text.charAt(0).toLocaleUpperCase()}${text.slice(1)}` : text;
    }
}
