import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { AlertSettings } from './alert.model';
import { UIService } from '../ui.service';

@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['alert.component.css']
})
export class AlertComponent implements OnInit, OnChanges {

    @Input() public settings: AlertSettings;
    @Output() public closed: EventEmitter<any> = new EventEmitter();

    public isClosed: boolean;
    protected defaultSettings: AlertSettings;

    constructor(private uiService: UIService) {
        this.defaultSettings = { color: 'danger', closable: true };
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

    public onClose(event: any): void {

        this.isClosed = !this.isClosed;
        this.closed.emit({originalEvent: event});
    }
}
