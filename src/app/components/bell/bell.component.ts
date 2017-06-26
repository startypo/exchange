import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { BellNotification } from '../../models/bell-notification.model';
import { BellService } from '../../services/bell.service';

@Component({
    selector: 'bell',
    templateUrl: 'bell.component.html'
})

export class BellComponent implements OnInit, OnDestroy {

    public model: BellNotification[];

    private onRouteChange: Subscription;
    private onRead: Subscription;
    private OnDelete: Subscription;
    private OnUpdate: Subscription;

    constructor(public service: BellService, private router: Router) { }

    public ngOnInit(): void {

        this.onRead = this.service.onRead.subscribe(
            (data: BellNotification[]) => this.model = data
        );

        this.OnUpdate = this.service.onUpdate.subscribe(

        );

        this.OnDelete = this.service.onDelete.subscribe(

        );

        this.service.read();
        this.onRouteChange = this.router.events.subscribe(e => this.service.read());
    }

    public remove(notificationId: string) {}

    public markAsRead(notificationId: string){}

    public ngOnDestroy(): void {
        this.onRouteChange.unsubscribe();
        this.onRead.unsubscribe();
    }
}
