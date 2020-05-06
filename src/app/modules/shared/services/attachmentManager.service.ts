import {EventEmitter, Injectable} from '@angular/core';

export interface AttachedItem {
    name: string;
    type: string;
    image: string;
    blob: Blob;
}

export class FilesToUpload {
    files: File[];
}

@Injectable()
export class AttachmentManagerService {
    constructor() {
        this.items = [];
        this.change = new EventEmitter<any>();
    }
    change: EventEmitter<any>;
    items: AttachedItem[];

    add(item: AttachedItem) {
        this.items.push(item);
        this.change.emit(this.items);
    }

    remove(index: number): void {
        this.items.splice(index, 1);
        this.change.emit(this.items);
    }

    toUpload(): FilesToUpload {

        const filesToUpload = new FilesToUpload();

        const files = [];
        this.items.forEach(attached => files.push(attached.blob as File));

        filesToUpload.files = files;

        return filesToUpload;
    }
}
