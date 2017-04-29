import { Component, OnDestroy, OnInit, OnChanges, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { NotifySettings, NotifyItem, NotifyEvent } from './notify.model';
import { NotifyService } from './notify.service';

import { UIService } from '../ui.service';

@Component({
    selector: 'notify',
    templateUrl: 'notify.component.html',
    styleUrls: ['notify.component.css']
})
export class NotifyComponent implements OnInit, OnChanges, OnDestroy {

    @Input() public settings: NotifySettings;

    @Output() public deleted: EventEmitter<any> = new EventEmitter();
    @Output() public created: EventEmitter<any> = new EventEmitter();

    public notifies: NotifyItem[] = [];

    protected defaultSettings: NotifySettings;

    private listener: Subscription;
    private latestNotify: NotifyItem;

    constructor(private el: ElementRef, private notifyService: NotifyService, private uiService: UIService) {
        this.defaultSettings = uiService.getSettings('notify');
    }

    public ngOnInit() {

        this.settings = (<any> Object).assign({}, this.defaultSettings, this.settings);

        this.listener = this.notifyService.getEmitter()
            .subscribe((item: NotifyEvent) => {
                switch (item.command) {
                    case 'removeAll':
                        this.removeAll();
                        break;
                    case 'remove':
                        this.removeOne(item.id);
                        break;
                    case 'create':
                        this.create(item.notify);
                        break;
                    default:
                    break;
                }
            });
    }

    public ngOnChanges(changes: any) {
        if (changes.settings) {
            let data = (<any> Object).assign({}, changes.settings.previousValue, changes.settings.currentValue);
            this.settings = (<any> Object).assign({}, this.defaultSettings, data);
        }
    }

    public create(item: NotifyItem): void {

        item.createdAt = new Date();
        this.latestNotify = item;

        if (this.settings.addToBottom) {
            if (this.notifies.length >= this.settings.maxItems) {
                this.notifies.splice(0, 1);
            }

            this.notifies.push(item);
        } else {
            if (this.notifies.length >= this.settings.maxItems) {
                this.notifies.splice(this.notifies.length - 1, 1);
            }

            this.notifies.splice(0, 0, item);
        }

        this.created.emit({id: item.id});
    }

    public removeAll(): void {
        this.notifies = [];
    }

    public removeOne(id: string): void {

        let indexOfDelete: number = 0;
        let doDelete: boolean = false;

        this.notifies.forEach((notify, index) => {
            if (notify.id === id) {
                this.notifies.splice(index, 1);
            }
        });

        this.deleted.emit({id: id});
    }

    public getPositionClass(): string {
        return this.settings.position.map(function(el) {
            return 'notify_position_' + el;
        }).join(' ');
    }

    public ngOnDestroy(): void {
        if (this.listener)
            this.listener.unsubscribe();
    }
}