import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'asBackgroundUrl' })
export class BackgroundUrlPipe implements PipeTransform {
    transform(url: string): string {
        return `url(${url})`;
    }
}
