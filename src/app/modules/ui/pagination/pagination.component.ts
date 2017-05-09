import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ElementRef, Self } from '@angular/core';
import { ControlValueAccessor, NgModel } from '@angular/forms';

import { PaginationPage, PaginationSettings, PaginationLangs } from './pagination.model';
import { UIService } from '../ui.service';

@Component({
    selector: 'pagination',
    templateUrl: 'pagination.component.html',
    styleUrls: ['pagination.component.css'],
    providers: [NgModel]
})
export class PaginationComponent implements ControlValueAccessor, OnInit, OnChanges {
    @Input() public settings: PaginationSettings;
    @Input() public langs: PaginationLangs;
    @Input() public disabled: boolean;
    @Input() public total: number;

    @Output() public selected: EventEmitter<any> = new EventEmitter();
    @Output() public prevClicked: EventEmitter<any> = new EventEmitter();
    @Output() public nextClicked: EventEmitter<any> = new EventEmitter();
    @Output() public lastClicked: EventEmitter<any> = new EventEmitter();
    @Output() public firstClicked: EventEmitter<any> = new EventEmitter();

    public model: NgModel;
    public pages: PaginationPage[];

    protected innerPage: number = 1;
    protected defaultSettings: PaginationSettings;
    protected defaultLangs: PaginationLangs;

    constructor(private el: ElementRef, @Self() model: NgModel, private uiService: UIService) {

        this.defaultSettings = uiService.getSettings('pagination');
        this.defaultLangs = uiService.getLangs('pagination');
        this.settings = (<any> Object).assign({}, this.defaultSettings, this.settings);
        this.model = model;
        model.valueAccessor = this;
    }

    public ngOnChanges(changes: any) {

        if (changes.total)
            this.pages = this.getPages(this.page);

        if (changes.settings) {
            let data = (<any> Object).assign({}, changes.settings.previousValue, changes.settings.currentValue);
            this.settings = (<any> Object).assign({}, this.defaultSettings, data);
        }

        if (changes.langs) {
            let data = (<any> Object).assign({}, changes.langs.previousValue, changes.langs.currentValue);
            this.langs = (<any> Object).assign({}, this.defaultLangs, data);
        }
    }

    public ngOnInit() {

        this.settings = (<any> Object).assign({}, this.defaultSettings, this.settings);
        this.langs = (<any> Object).assign({}, this.defaultLangs, this.langs);
        this.innerPage = this.model.model;
    }

    public select(event: any, page: number): void {

        event.preventDefault();

        if (!this.disabled) {
            this.writeValue(page);
            this.model.viewToModelUpdate(this.page);

            this.selected.emit({page: page});
        }
    }

    public prevSelect(event: any, page: number): void {
        this.select(event, page - 1);
        this.prevClicked.emit({page: this.page});
    }

    public nextSelect(event: any, page: number): void {
        this.select(event, page + 1);
        this.nextClicked.emit({page: this.page});
    }

    public lastSelect(event: any): void {
        this.select(event, this.total);
        this.lastClicked.emit({originalEvent: event});
    }

    public firstSelect(event: any): void {
        this.select(event, 1);
        this.firstClicked.emit({originalEvent: event});
    }

    get page(): any {
        return (this.innerPage === undefined) ? 1 : this.innerPage;
    };

    set page(value: any) {
        this.innerPage = value > this.total ? this.total : (value || 1);
        this.onChangeCallback(value);
    }

    public writeValue(value: any) {
        this.innerPage = value;
        this.pages = this.getPages(this.page);
    }

    public registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    public hasPrev(): boolean {
        return this.page === 1;
    }

    public hasNext(): boolean {
        return this.page === this.total;
    }

    protected onTouchedCallback: () => void = () => { };
    protected onChangeCallback: (_: any) => void = () => { };

    private getPages(current: number): PaginationPage[] {

        let pages: PaginationPage[] = [];
        let startPage = 1;
        let endPage = this.total;
        let isMax = (this.settings.max !== 0) && (this.settings.max < this.total) ? true : false;

        if (isMax) {
            startPage = Math.max(current - Math.floor(this.settings.max / 2), 1);
            endPage = startPage + this.settings.max - 1;

            if (endPage > this.total) {
                endPage = this.total;
                startPage = endPage - this.settings.max + 1;
            }
        }

        for (let n = startPage; n <= endPage; n++) {
            let page = {
                number: n,
                text: n.toString(),
                active: (n === current)
            };

            pages.push(page);
        }

        if (isMax) {
            if (startPage > 1) {
                let prev = {
                    number: (startPage - 1),
                    text: this.settings.separator,
                    active: false
                };
                pages.unshift(prev);
            }

            if (endPage < this.total) {
                let next = {
                    number: (startPage + 1),
                    text: this.settings.separator,
                    active: false
                };

                pages.push(next);
            }
        }

        return pages;
    }
}
