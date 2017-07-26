import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

import { BellNotification } from '../../models/bell-notification.model';
import { BellService } from '../../services/bell.service';

@Component({
    selector: 'bell',
    templateUrl: 'bell.component.html',
    styleUrls: ['./style.scss']
})

export class BellComponent implements OnInit, OnDestroy {

    public model: BellNotification[] = [];
    private removedIndex: number;

    private onRouteChange: Subscription;
    private onRead: Subscription;
    private OnDelete: Subscription;

    constructor(public service: BellService, private router: Router) { }

    public ngOnInit(): void {

        this.onRead = this.service.onRead.subscribe(
            (data: BellNotification[]) => this.model = data
        );

        this.OnDelete = this.service.onDelete.subscribe(
            () => this.model.splice(this.removedIndex)
        );

        this.service.read();
        this.onRouteChange = this.router
                                 .events
                                 .filter(e => e instanceof NavigationStart)
                                 .subscribe(e => this.service.read());
    }

    public remove(i: number) {

        this.removedIndex = i;
        const ntf: BellNotification = this.model[this.removedIndex];
        this.service.delete(ntf.id);
    }

    public ngOnDestroy(): void {

        this.onRouteChange.unsubscribe();
        this.onRead.unsubscribe();
    }
}
