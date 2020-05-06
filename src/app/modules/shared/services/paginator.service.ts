import {Injectable} from '@angular/core';

import {Observable, Subject} from 'rxjs';
import {distinctUntilChanged, finalize, mergeMap, switchMap, tap} from 'rxjs/operators';

export interface FiltersInterface { [key: string]: any; }
export interface SubjectsInterface { filters: Subject<any>; pagination: Subject<any>; }
export interface PaginationInterface { offset: number; limit: number; disabled: boolean; finished: boolean; }
export interface LoadingInterface { pagination: boolean; filters: boolean; }

@Injectable()
export class PaginatorService {
    filters: FiltersInterface;
    pagination: PaginationInterface;
    subjects: SubjectsInterface;
    loadings: LoadingInterface;
    finished: boolean;
    disabled: boolean;

    set itemHeight(height) {
        this.pagination.limit = Math.round(window.innerHeight / height * 1.5);
    }

    set limit(limit) {
        this.pagination.limit = limit;
    }

    get loading() {
        return this.loadings.pagination || this.loadings.filters;
    }

    constructor() {
        this.subjects = {
            filters: new Subject<any>(),
            pagination: new Subject<any>()
        };

        this.pagination = {
            offset: 0,
            limit: 20,
            disabled: false,
            finished: false
        };

        this.loadings = {
            pagination: false,
            filters: false
        };

        this.filters = {};
    }

    setFilters(filters: FiltersInterface): void {
        this.filters = {};

        Object.keys(filters).forEach((key: string | number ) => {
            if (filters[key] != null && ((typeof filters[key] === 'string' && filters[key].length > 0) || (typeof filters[key] === 'number') || (typeof filters[key] === 'boolean') )) {
                this.filters[key] = filters[key];
            }
        });

        this.subjects.filters.next({ ...this.filters });
        this.subjects.pagination.next(this.createPayloadObject());
    }

    nextPage(): void {
        if (this.pagination.finished) {
            return;
        }

        this.pagination.offset += this.pagination.limit;
        this.subjects.pagination.next(this.createPayloadObject());
    }

    createStream(observableFactory: Function): Observable<any> {
        return this.subjects.filters.pipe(
            // distinctUntilChanged((previous: any, current: any) => this.compareStreams(previous, current, true)),
            switchMap((filtersProperties: any) => {
                this.filters = { ...filtersProperties };
                this.pagination.offset = 0;
                this.pagination.finished = false;
                this.loadings.filters = true;

                return this.subjects.pagination.pipe(
                    distinctUntilChanged((previous: any, current: any) => this.compareStreams(previous, current)),
                    mergeMap(() => {
                        this.loadings.pagination = true;

                        return observableFactory(this.createPayloadObject()).pipe(
                            tap((response: any[]) => {
                                this.pagination.finished = response.length < this.pagination.limit;
                                this.pagination.disabled = true;
                                this.pagination.disabled = false;
                            }),
                            finalize(() => {
                                this.loadings.filters = false;
                                this.loadings.pagination = false;
                            })
                        );
                    })
                );
            })
        );
    }

    private compareStreams(previous: any, current: any, debug: boolean = false): boolean {
        if (debug) {
            console.log(previous, current, Object.keys(previous).every(key => previous[key] === current[key]));
        }

        return Object.keys(previous).every(key => previous[key] === current[key]);
    }

    private createPayloadObject() {
        const payload = { ...this.filters };

        payload.offset = this.pagination.offset;
        payload.limit = this.pagination.limit;

        return payload;
    }
}
