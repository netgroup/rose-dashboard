import * as Moment from 'moment';
import {Injectable} from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class DatesService {
    static fromMomentToDateStruct(moment: any): NgbDateStruct {
        return (!moment.isValid()) ? null : {
            year: moment.year(),
            month: moment.month() + 1,
            day: moment.date()
        };
    }

    static fromDateStructToMoment(date: NgbDateStruct) {
        return Moment.utc({
            year: date.year,
            month: date.month - 1,
            date: date.day
        });
    }

    static asMoment(date: string) {
        return Moment.utc(date).startOf('day');
    }
}
