import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ElementRef, forwardRef, ViewChild, Inject } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DOCUMENT } from '@angular/platform-browser';

import { EditorSettings, EditorLangs } from './editor.model';
import { UIService } from '../ui.service';

@Component({
    selector: 'editor',
    templateUrl: 'editor.component.html',
    styleUrls: ['editor.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => EditorComponent),
        multi: true
    }]
})
export class EditorComponent implements OnInit, OnChanges, ControlValueAccessor {

    @Input() public name: string = '';
    @Input() public disabled: boolean;
    @Input() public settings: EditorSettings;
    @Input() public langs: EditorLangs;

    @ViewChild('area') public area: ElementRef;
    @ViewChild('toolbar') public toolbar: ElementRef;

    protected innerValue: any = '';
    protected defaultSettings: EditorSettings;
    protected defaultLangs: EditorLangs;

    constructor(private el: ElementRef, @Inject(DOCUMENT) private document: any, private uiService: UIService) {

        this.defaultSettings = uiService.getSettings('editor');
        this.defaultLangs = uiService.getLangs('editor');
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

    public command(cmd: string, arg: string): void {

        this.document.execCommand(cmd, false, arg);
    }

    public execute(event: any, cmd: string, arg: string): void {

        switch (cmd) {
            case 'pre':
                cmd = 'formatblock';
                arg = 'pre';
            break;
            case 'blockquote':
                cmd = 'formatblock';
                arg = 'blockquote';
            break;
            default:
            break;
        }

        this.command(cmd, arg);
    }

    public cmdState(cmd: string): any {

        return document.queryCommandState(cmd);
    }

    public cmdValue(cmd: string): any {

        return document.queryCommandValue(cmd);
    }

    public isElement(tag: string): boolean {

        let selection = window.getSelection().getRangeAt(0);

        if (selection) {
            if (selection.startContainer.nodeName === tag.toUpperCase() ||
                selection.endContainer.nodeName === tag.toUpperCase()) {
                return true;
            } else
                return false;
        } else
            return false;
    }

    public setFontSize(event: any): void {

        event.preventDefault();
        let value = event.target.value;
        let size = this.getKeyByValue(this.settings.fontSizes, value);

        if (value && size) {
            let spanString = '<span style="font-size:' + (size.size) + '">' + this.document.getSelection() + '<span/>';
            document.execCommand('insertHTML', false, spanString);
        }
    }

    public getKeyByValue(object: Object, value: any): any {

        let result = Object(object).filter(function(obj: any) {
            return obj.value === value;
        });

        return result.length ? result[0] : false;
    }

    public setValue(event: any): void {
        this.value = this.area.nativeElement.innerHTML;
    }

    get value(): any {
        return this.innerValue;
    };

    set value(v: any) {

        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }

    public writeValue(value: any) {

        if (value !== this.innerValue)
            this.innerValue = value;
    }

    public registerOnChange(fn: any) {

        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn: any) {

        this.onTouchedCallback = fn;
    }

    protected onTouchedCallback: () => void = () => {};
    protected onChangeCallback: (_: any) => void = () => {};
}
