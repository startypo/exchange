import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotifyItem, NotifyItemSettings } from './notify.model';
import { NotifyService } from './notify.service';

@Component({
    selector: 'notify-item',
    templateUrl: 'notify-item.component.html',
    styleUrls: ['notify-item.component.css']
})
export class NotifyItemComponent implements OnInit, OnDestroy {

    @Input() public item: NotifyItem;
    @Input() public settings: NotifyItemSettings;
    @Input() public maxItems: number;
    @Input() public closeble: boolean;
    @Input() public duration: number;
    @Input() public stopOnHover: boolean;
    @Input() public index: number;

    @Output() public created: EventEmitter<any> = new EventEmitter();
    @Output() public deleted: EventEmitter<any> = new EventEmitter();

    private speed: number;
    private timer: any;

    constructor(private notifyService: NotifyService) { }

    public ngOnInit() {
        if (this.item.settings === undefined) {
            this.settings = {
                duration: this.duration,
                closeble: this.closeble
            };
        } else {
            this.settings = {
                duration: (!this.item.settings.duration) ? this.duration : this.item.settings.duration,
                closeble: (!this.item.settings.closeble) ? this.closeble : this.item.settings.closeble
            };
        }

        if (this.settings.duration !== 0) {
            this.startDuration();
        }
    }

    public close(event: any, item: NotifyItem): void {

        event.preventDefault();
        this.notifyService.remove(item.id);
    }

    public startDuration(): void {
        this.speed = this.settings.duration * 1000;
        this.timer = setTimeout(() => {
            this.notifyService.remove(this.item.id);
        }, this.speed);
    }

    public ngOnDestroy(): void {
        clearTimeout(this.timer);
    }
}
