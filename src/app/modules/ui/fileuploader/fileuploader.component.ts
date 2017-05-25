import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { FileUploaderSettings, FileUploaderLangs } from './fileuploader.model';
import { FileService } from './file.service';
import { UIService } from '../ui.service';

@Component({
    selector: 'fileuploader',
    templateUrl: 'fileuploader.component.html',
    styleUrls: ['fileuploader.component.css']
})
export class FileUploaderComponent implements OnInit, OnChanges {

    @Input() public name: string = '';
    @Input() public disabled: boolean;
    @Input() public settings: FileUploaderSettings;
    @Input() public langs: FileUploaderLangs;
    @Input() public files: any[] = [];

    @Output() public clicked: EventEmitter<any> = new EventEmitter();
    @Output() public rejected: EventEmitter<any> = new EventEmitter();
    @Output() public preview: EventEmitter<any> = new EventEmitter();
    @Output() public remove: EventEmitter<any> = new EventEmitter();
    @Output() public uploadStart: EventEmitter<any> = new EventEmitter();
    @Output() public uploadProgress: EventEmitter<any> = new EventEmitter();
    @Output() public uploadAbort: EventEmitter<any> = new EventEmitter();
    @Output() public uploadError: EventEmitter<any> = new EventEmitter();
    @Output() public uploadDone: EventEmitter<any> = new EventEmitter();

    @ViewChild('fileInput') public fileInput: ElementRef;

    public previewPrefix: string = 'preview';

    protected queueList: any[] = [];
    protected progress: Object = {
        loaded: 0,
        total: 0,
        percent: 0,
        speed: 0,
        time: 0,
        load: 0,
        convertedSpeed: null
    };
    protected done: boolean = false;
    protected error: boolean = false;
    protected abort: boolean = false;
    protected defaultSettings: FileUploaderSettings;
    protected defaultLangs: FileUploaderLangs;

    constructor(private el: ElementRef, private uiService: UIService, private service: FileService) {

        this.defaultSettings = uiService.getSettings('fileuploader');
        this.defaultLangs = uiService.getLangs('fileuploader');

        this.service.onDownload.subscribe((file: File) => {
                this.files.push(file);
                this.createFilePreview(file);
        });
    }

    public ngOnInit() {

        this.settings = (<any> Object).assign({}, this.defaultSettings, this.settings);
        this.langs = (<any> Object).assign({}, this.defaultLangs, this.langs);
    }

    public ngOnChanges(changes: any) {

        if (changes.settings) {
            let data = (<any> Object).assign({}, changes.settings.previousValue, changes.settings.currentValue);
            this.settings = (<any> Object).assign({}, this.defaultSettings, data);
        }

        if (changes.langs) {
            let data = (<any> Object).assign({}, changes.langs.previousValue, changes.langs.currentValue);
            this.langs = (<any> Object).assign({}, this.defaultLangs, data);
        }
    }

    public showUploadDialog(): void {
        this.fileInput.nativeElement.click();
    }

    public onClick(event: any): void {
        this.clicked.emit({ originalEvent: event });
    }

    public onChange(file: any): void {

        if (this.isMaxNumberOfFiles()) {
            this.rejected.emit({ file: file, reason: this.langs.maxNumberOfFiles });
            return;
        }

        if (!this.fileIsAllowed(file)) {
            this.rejected.emit({ file: file, reason: this.langs.extensionNotAllowed });
            return;
        }

        if (this.settings.autoupload)
            this.uploadFile(file);
        else
            this.addToQueue(file);
    }

    public isMaxNumberOfFiles() {
        return this.files.length === this.settings.maxNumberOfFiles;
    }

    public addToQueue(file: any): void {

        if (!this.inQueue(file))
            this.queueList.push(file);

        if (this.settings.showPreview)
            this.createFilePreview(file);
    }

    public uploadInQueue(): void {

        this.queueList.forEach((file) => {
            this.uploadFile(file);
        });

        this.clearQueue();
    }

    public setUploadProgres(progress: Object): void {
        this.progress = progress;
    }

    public setUploadAbort(): void {
        this.error = true;
        this.done = true;
    }

    public setUploadError(): void {
        this.abort = true;
        this.done = true;
    }

    public uploadFile(file: any): void {

        let xhr = new XMLHttpRequest();
        let form = new FormData();

        form.append(this.name, file, file.name);

        let loadData: any = null;

        xhr.upload.onprogress = (event: ProgressEvent) => {
            if (this.settings.speedProgress)
                loadData = this.progressData(event);

            this.setUploadProgres(loadData);
            this.uploadProgress.emit(loadData);
        };

        xhr.upload.onabort = (e: Event) => {
            this.setUploadAbort();
            this.uploadAbort.emit(loadData);
        };

        xhr.upload.onerror = (e: Event) => {
            this.setUploadError();
            this.uploadError.emit(loadData);
        };

        xhr.open('POST', this.settings.url, true);
        xhr.withCredentials = this.settings.credentials;

        if (this.settings.headers.length) {
            Object.keys(this.settings.headers).forEach((key) => {
                xhr.setRequestHeader(key, this.settings.headers[key]);
            });
        }

        if (this.settings.authToken)
            xhr.setRequestHeader('Authorization', `${this.settings.authTokenPrefix} ${this.settings.authToken}`);

        this.uploadStart.emit({ file: file });
        xhr.send(form);

        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {

                let res = JSON.parse(xhr.response);

                file.id = res.id;
                this.files.push(file);
                if (this.settings.showPreview && this.settings.autoupload)
                    this.createFilePreview(file);

                this.uploadDone.emit({ filename: res.filename });
            }
        };
    }

    public removeFile(index: number): void {

        let file: File = this.files[index];
        this.files.splice(index, 1);
        this.service.remove(file.name);
    }

    public progressData(event: ProgressEvent): any {

        let data: any = {};

        data.total = event.total;
        data.time = new Date().getTime() - data.time;
        data.loaded = event.loaded;
        data.load = event.loaded - data.load;
        data.speed = data.load / data.time * 1000;
        data.speed = parseInt(<any>data.speed, 10);
        data.convertedSpeed = this.convertBytes(data.speed);
        data.percent = Math.round(event.loaded / event.total * 100);

        return data;
    }

    public createFilePreview(file: File): void {

        let reader: FileReader = new FileReader();

        reader.addEventListener('load', () => {

            let fileId = this.previewPrefix + '-' + file.name + '-' + file.size;
            let fileEl = document.getElementById(fileId);
            let renderResult: string;

            if (this.imageExtensionIsAllow(file.type)) {
                renderResult = reader.result;
                fileEl.setAttribute('src', renderResult);
            } else if (this.fileExtensionIsAllow(file.type)) {
                let extIndex = file.type.lastIndexOf('/');
                renderResult = this.settings.iconsPath + '/' + file.type.substring(extIndex + 1) + '.png';
                fileEl.setAttribute('src', renderResult);
                this.preview.emit({ url: renderResult });
            } else {
                renderResult = '';
                this.preview.emit({ url: renderResult });
            }
        });

        reader.readAsDataURL(file);
    }

    // public isFile(file: any): boolean {
    //     return file !== null && (file instanceof Blob || (file.name && file.size));
    // }

    public inQueue(file: any): boolean {
        let fileInQueue = this.queueList.filter((f) => { return f === file; });
        return fileInQueue.length ? true : false;
    }

    public clearQueue(): void {
        this.queueList = [];
    }

    public clearAll(): void {

        this.files.forEach(file => {
            this.service.remove(file.name);
        });

        this.files = [];
        this.clearQueue();
    }

    // public getQueueLength(): number {
    //     return this.queueList.length;
    // }

    public fileIsAllowed(file: any): boolean {

        let extension: string = file.name.split('.').pop();
        if (this.fileExtensionIsAllow(file.type) || this.fileExtensionIsAllow(extension) ||
            this.imageExtensionIsAllow(file.type) || this.imageExtensionIsAllow(file.type))
            return true;

        return false;
    }

    public fileExtensionIsAllow(extension: string): boolean {

        if (this.settings.filesExtensions.indexOf(extension) !== -1)
            return true;

        return false;
    }

    public imageExtensionIsAllow(extension: string): boolean {

        if (this.settings.imagesExtensions.indexOf(extension) !== -1)
            return true;

        return false;
    }

    public convertBytes(bytes: number): string {

        if (bytes === 0)
            return this.langs.zeroBytes;

        let k = 1024;
        const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
        let i: number = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i] + '/s';
    }

    protected onTouchedCallback: () => void = () => { };
    protected onChangeCallback: (_: any) => void = () => { };
}
