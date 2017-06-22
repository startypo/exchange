import { Injectable, EventEmitter } from '@angular/core';
import { NotifyItem, NotifyEvent, NotifyItemSettings } from './notify.model';

@Injectable()
export class NotifyService {

    private emitter: EventEmitter<NotifyEvent> = new EventEmitter<NotifyEvent>();

    constructor() { }

    public create(notify: NotifyItem) {
        notify.id = Math.random().toString();
        this.emitter.next({
            command: 'create', notify: notify
        });

        return notify;
    }

    public getEmitter(): EventEmitter<NotifyEvent> {
        return this.emitter;
    }

    public error(title: string, content: string, settings?: NotifyItemSettings): NotifyItem {
        return this.create({
            title: title,
            content: content,
            settings: settings,
            type: 'error'
        });
    }

    public info(title: string, content: string, settings?: NotifyItemSettings): NotifyItem {
        return this.create({
            title: title,
            content: content,
            settings: settings,
            type: 'info'
         });
    }

    public success(title: string, content: string, settings?: NotifyItemSettings): NotifyItem {
        return this.create({
            title: title,
            content: content,
            settings: settings,
            type: 'success'
        });
    }

    public warning(title: string, content: string, settings?: NotifyItemSettings): NotifyItem {
        return this.create({
            title: title,
            content: content,
            settings: settings,
            type: 'warning'
        });
    }

    public message(title: string, content: string, settings?: NotifyItemSettings): NotifyItem {
        return this.create({
            title: title,
            content: content,
            settings: settings,
            type: 'message'
        });
    }

    public remove(notifyId?: string): void {
        this.emitter.next({
            command: 'remove',
            id: notifyId
        });
    }

    public removeAll(): void {
        this.emitter.next({
            command: 'removeAll'
        });
    }
}
