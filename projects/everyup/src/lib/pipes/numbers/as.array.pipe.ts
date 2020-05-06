import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'asArray' })
export class FromNumberToArrayPipe implements PipeTransform {
    transform(count: number, from: number = 0): number[] {
        return Array(count - from).fill(count);
    }
}
