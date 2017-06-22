import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { Observable, Subject } from 'rxjs';

import { UIService } from '../ui.service';
import { FileUploaderSettings } from './fileuploader.model';


@Injectable()
export class FileService  {

    public onUpload: Observable<string>;
    public onDownload: Observable<File>;
    public onRemove: Observable<string>;
    public onError: Observable<Response>;

    protected uploadSubject: Subject<string>;
    protected downloadSubject: Subject<File>;
    protected removeSubject: Subject<string>;
    protected errorSubject: Subject<Response>;


    private settings: FileUploaderSettings;

    constructor(private http: Http, private service: UIService) {

        this.settings = this.service.getSettings('fileuploader');

        this.uploadSubject = new Subject<string>();
        this.onUpload = this.uploadSubject.asObservable();

        this.downloadSubject = new Subject<File>();
        this.onDownload = this.downloadSubject.asObservable();

        this.removeSubject = new Subject<string>();
        this.onRemove = this.removeSubject.asObservable();
    }

    public upload(file: File): void {}

    public download(fileId: string): void {

        let params = new URLSearchParams();
        params.set(this.settings.query, fileId);

        let options = new RequestOptions();
        options.search = params;
        options.responseType = ResponseContentType.Blob;

        this.http.get(this.settings.url, options)
                 .map((res: Response) => {
                    let filename = res.headers.get('content-disposition').split('=')[1].replace(/"/g, '');
                    let mimetype = res.headers.get('content-type');
                    let blob = res.blob();
                    return new File([blob], filename, { type: mimetype });
                 })
                 .catch(err => Observable.throw(new DownloadError(err.text())))
                 .subscribe(
                    (data: File) => this.downloadSubject.next(data),
                    (err) => this.errorSubject.next(err)
                 );
    }

    public remove(filename: string) {
        this.removeSubject.next(filename);
    }
}

// tslint:disable-next-line:max-classes-per-file
export class DownloadError {
    constructor(public text: string) { }
}
