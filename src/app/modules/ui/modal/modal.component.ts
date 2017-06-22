import { Component, OnInit, OnChanges, Input, Output, EventEmitter, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { ModalSettings } from './modal.model';
import { UIService } from '../ui.service';

@Component({
    selector: 'modal',
    templateUrl: 'modal.component.html'
})
export class ModalComponent implements OnInit, OnChanges {
    @Input() public settings: ModalSettings;
    @Input() public target: string;

    @Output() public showed: EventEmitter<any> = new EventEmitter();
    @Output() public closed: EventEmitter<any> = new EventEmitter();

    public backdrop: any;
    public isShowed: boolean = false;

    protected defaultSettings: ModalSettings;

    constructor(@Inject(DOCUMENT) private document: any, private uiService: UIService) {
        this.defaultSettings = uiService.getSettings('modal');
    }

    public ngOnInit() {
        this.settings = (<any> Object).assign({}, this.defaultSettings, this.settings);
    }

    public ngOnChanges(changes: any) {

        if (changes.settings) {
            let data = (<any> Object).assign({}, changes.settings.previousValue, changes.settings.currentValue);
            this.settings = (<any> Object).assign({}, this.defaultSettings, data);
        }
    }

    @HostListener('document:click', ['$event', '$event.target'])
    public onClick(event: any, targetElement: HTMLElement): void {

        if (this.isShowed)
            return;

        const clickedInside = targetElement.classList.contains('modal');

        if (clickedInside)
            this.close(event);
    }

    public show(event: any): void {

        if (this.isShowed)
            return;

        this.isShowed = true;
        this.createBackdrop();
        this.showed.emit({originalEvent: event});
    }

    public close(event: any): void {

        this.isShowed = false;
        this.document.body.classList.remove('modal-open');
        this.backdrop.remove();
        this.closed.emit({originalEvent: event});
    }

    private createBackdrop(): void {

        this.document.body.classList.add('modal-open');
        this.backdrop = this.document.createElement('div');
        this.backdrop.classList.add('modal-backdrop', 'fade', 'in');
        this.document.body.appendChild(this.backdrop);
    }
}
