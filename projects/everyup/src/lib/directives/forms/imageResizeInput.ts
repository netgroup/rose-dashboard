import {Directive, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

import {fromEvent, Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

export interface ImageResizeInputOptions {
    maxWidth: number;
    maxHeight: number;
    quality: number;
    type: string;
}

export interface ImageResizeResult {
    data: string;
    blob: Blob;
}

@Directive({
    selector: 'input[type=file][imageResizeInput]'
})
export class ImageResizeInputDirective implements OnChanges {
    @Input('imageResizeInput') options: ImageResizeInputOptions;
    @Output('selected') selectedEmitter: EventEmitter<any>;

    constructor() {
        this.selectedEmitter = new EventEmitter<any>();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!this.options) {
            this.options = {
                maxWidth: 1024,
                maxHeight: 1024,
                quality: 0.9,
                type: 'image/jpeg'
            };
        }
    }

    @HostListener('change', ['$event'])
    onFileChange(event): void {
        of(event.target.files[0]).pipe(
            switchMap((file: File) => this.fromFileToDataURL(file)),
            switchMap((dataURL: string) => this.fromDataURLToImageElement(dataURL)),
            switchMap((image: HTMLImageElement) => this.resizeImage(image))
        ).subscribe(
            (result: ImageResizeResult) => this.selectedEmitter.emit(result)
        );
    }

    private fromFileToDataURL(file: File): Observable<string> {
        const reader = new FileReader();
        const observer: Observable<string> = fromEvent(reader, 'load')
            .pipe(
                map((result: any) => result.target.result)
            );

        reader.readAsDataURL(file);

        return observer;
    }

    private fromDataURLToImageElement(dataURL: string): Observable<HTMLImageElement> {
        const image: HTMLImageElement = new Image();
        const observer = fromEvent(image, 'load').pipe(map(() => image));

        image.src = dataURL;

        return observer;
    }

    private resizeImage(image: HTMLImageElement): Observable<ImageResizeResult> {
        const canvas: HTMLCanvasElement = document.createElement('canvas');

        let height = image.height;
        let width = image.width;

        if (width > this.options.maxWidth) {
            height = Math.round(height * this.options.maxWidth / width);
            width = this.options.maxWidth;
        }

        if (height > this.options.maxHeight) {
            width = Math.round(width * this.options.maxHeight / height);
            height = this.options.maxHeight;
        }

        canvas.width = width;
        canvas.height = height;

        const context: CanvasRenderingContext2D = canvas.getContext('2d');

        context.drawImage(image, 0, 0, width, height);

        const dataURL: string = canvas.toDataURL(this.options.type, this.options.quality);

        console.log(`Converting image from ${image.width}x${image.height} size to ${width}x${height} (${dataURL.length}) size in ${this.options.type} format.`);

        return of({
            data: dataURL,
            blob: this.fromDataURLToBlob(dataURL, this.options.type)
        });
    }

    private fromDataURLToBlob(dataURL: string, contentType: string = this.options.type, sliceSize: number = 512): Blob {
        const byteCharacters = atob(dataURL.split(',')[1]);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);

            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            byteArrays.push(new Uint8Array(byteNumbers));
        }

        return new Blob(byteArrays, { type: contentType });
    }

    /*
    private orientImageFromEXIFMetadata(image: HTMLImageElement): Observable<HTMLImageElement> {
        return Observable.create((observer: any) => {
            EXIF = EXIF || this.createDefaultEXIFObject(image);
            EXIF.getData(image, () => {
                const orientation = EXIF.getTag(image, 'Orientation');
                const canvas: HTMLCanvasElement = document.createElement('canvas');
                const context: CanvasRenderingContext2D = <CanvasRenderingContext2D> canvas.getContext('2d');

                if (orientation !== 1) {
                    let width: number = image.width;
                    let height: number = image.height;
                    let x = 0, y = 0, degree = 0;

                    switch (orientation) {
                        case 3:
                        case 4:
                            x = -image.width;
                            y = -image.height;
                            degree = 180;

                            break;
                        case 5:
                        case 6:
                            width = image.height;
                            height = image.width;
                            degree = 90;
                            y = -image.height;

                            break;
                        case 7:
                        case 8:
                            width = image.height;
                            height = image.width;
                            degree = 270;
                            x = -image.width;

                            break;
                        default:
                            break;
                    }

                    canvas.width = width;
                    canvas.height = height;

                    // Flipping image
                    if ([2, 4, 5, 7].indexOf(orientation) > -1) {
                        context.translate(width, 0);
                        context.scale(-1, 1);
                    }

                    context.rotate(degree * Math.PI / 180);
                    context.drawImage(image, x, y);

                    const rotatedImage: HTMLImageElement = document.createElement('img');

                    rotatedImage.width = width;
                    rotatedImage.height = height;

                    fromEvent(rotatedImage, 'load').subscribe(() => {
                        observer.next(rotatedImage);
                        observer.complete();
                    });

                    rotatedImage.src = canvas.toDataURL(this.options.type);
                } else {
                    observer.next(image);
                    observer.complete();
                }
            });
        });
    }

    private createDefaultEXIFObject(image: HTMLImageElement) {
        const defaultEXIF: {
            getData: Function,
            getTag: Function
        } = {
            getData: (img, cb) => {
                cb.call(image);

                return true;
            },
            getTag: (source: HTMLImageElement, tag: string) => false
        };

        return defaultEXIF;
    }
    */
}
