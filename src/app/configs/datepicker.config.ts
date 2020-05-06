import {NgbDateParserFormatter, NgbDatepickerConfig, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Injectable} from '@angular/core';

@Injectable()
export class DatepickerConfig {
    constructor(config: NgbDatepickerConfig) {
        const now = new Date();

        config.minDate = { year: 1930, month: 1, day: 1 };
        config.maxDate = { year: now.getFullYear(), month: now.getMonth(), day: now.getDate() };
        config.showWeekdays = false;
    }
}

@Injectable()
export class DatepickerProfileEditConfig {
    constructor(config: NgbDatepickerConfig) {
        const now = new Date();

        now.setFullYear(now.getFullYear() - 18);

        config.minDate = { year: 1930, month: 1, day: 1 };
        config.maxDate = { year: now.getFullYear(), month: now.getMonth(), day: now.getDate() };
        config.showWeekdays = false;
    }
}

@Injectable()
export class DatepickerItalianFormatter extends NgbDateParserFormatter {
    parse(value: string): NgbDateStruct {
        if (value) {
            const dateParts = value.trim().split('/');

            if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
                const now = new Date();

                const minimumYear: number = now.getFullYear() - 14;
                const year: number = toInteger(dateParts[2]);
                const month: number = toInteger(dateParts[1]);
                const date: number = toInteger(dateParts[0]);

                if (dateParts[2].length === 4 && year < minimumYear) {
                    return {
                        year: year,
                        month: month,
                        day: date
                    };
                }
            }
        }

        return null;
    }

    format(date: NgbDateStruct): string {
        let stringDate = '';

        if (date) {
            stringDate += isNumber(date.day) ? padNumber(date.day) + '/' : '';
            stringDate += isNumber(date.month) ? padNumber(date.month) + '/' : '';
            stringDate += date.year;
        }

        return stringDate;
    }
}

function padNumber(value: number) {
    if (isNumber(value)) {
        return `0${value}`.slice(-2);
    } else {
        return '';
    }
}

function isNumber(value: any): boolean {
    return !isNaN(toInteger(value));
}

function toInteger(value: any): number {
    return parseInt(`${value}`, 10);
}
