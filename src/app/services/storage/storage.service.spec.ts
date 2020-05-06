import {async, TestBed} from '@angular/core/testing';

import {StorageService} from '@rose/services/storage/storage.service';

describe('Services::Storage service', () => {
    let testPrefix: string;
    let service: StorageService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [],
            providers: [StorageService]
        }).compileComponents();
    }));

    beforeEach(() => {
        testPrefix = 'storage.service.spec';
        service = new StorageService();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should check that storage doesn\'t contain any test purpose object', () => {
        expect(service.keys()).toBeTruthy();
        expect(service.keys(testPrefix).length).toBe(0);
    });

    it('should add a new key', (done) => {
        const key = buildKey('unexisting-key');
        const value = 'with its value';

        service.add.subscribe(data => {
            expect(data).toBeTruthy();
            expect(data.key).toBe(key);
            expect(data.value).toBe(value);

            done();
        });

        service.set(key, value);

        expect(service.get(key)).toBeTruthy();
        expect(service.get(key)).toBe(value);
    });

    it('should update an existing key', (done) => {
        const key = buildKey('unexisting-key');
        const value = 'with another value';

        service.change.subscribe(data => {
            expect(data).toBeTruthy();
            expect(data.key).toBe(key);
            expect(data.newValue).toBe(value);
            expect(data.oldValue).toBe('with its value');

            done();
        });

        service.set(key, value);

        expect(service.get(key)).toBeTruthy();
        expect(service.get(key)).toBe(value);
    });

    it('should remove an existing key', (done) => {
        const key = buildKey('unexisting-key');

        service.remove.subscribe(data => {
            expect(data).toBeTruthy();
            expect(data.key).toBe(key);
            expect(data.oldValue).toBe('with another value');

            done();
        });

        service.unset(key);

        expect(service.get(key)).not.toBeTruthy();
    });

    afterAll(() => {
        const keys = service.keys(testPrefix);

        keys.forEach(key => {
            service.unset(key);
        });
    });
});

function buildKey(key: string): string {
    return `storage.service.spec.${key}`;
}
