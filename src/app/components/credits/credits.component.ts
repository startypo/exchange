import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VgAPI } from 'videogular2/core';
import { Subscription } from 'rxjs';

import { Hand } from '../../models/hand.model';
import { NotifyService } from '../../modules/ui/notify/notify.service';
import { HandService } from '../../services/hand.service';

@Component({
    selector: 'credits',
    templateUrl: 'credits.component.html',
    styleUrls: ['credits.component.css']
})

export class CreditsComponent implements OnInit, OnDestroy {

    public model: Hand = new Hand();
    public api: VgAPI;

    private onRead: Subscription;
    private onCredit: Subscription;
    private onError: Subscription;
    private onVideoEnd: any;

    constructor(private service: HandService, private notify: NotifyService,
                private router: Router, private route: ActivatedRoute) {}

    public ngOnInit(): void {

        this.onRead = this.service.onRead.subscribe(
            (data: Hand) => this.model = data
        );

        this.onCredit = this.service.onCredit.subscribe(
            (data: Hand) => this.model = data
        );

        this.onError = this.service.onError.subscribe(
            (err) => this.notify.error('XChanges', 'Something went wrong.')
        );

        this.service.read();
    }

    public ngOnDestroy(): void {

        this.onRead.unsubscribe();
        this.onCredit.unsubscribe();
        this.onError.unsubscribe();
        this.onVideoEnd.unsubscribe();
    }

    public onPlayerReady(api: VgAPI) {

        this.api = api;

        this.onVideoEnd = this.api.getDefaultMedia().subscriptions.ended.subscribe(() => {

            this.service.credit(this.api.getDefaultMedia().currentTime);
        });
    }

    // @HostListener('window:beforeunload', [ '$event' ])
    // public beforeUnloadHander(e) {
    //     console.log(this.api.getDefaultMedia().time);
    // }

    // @HostListener('window:popstate', ['$event'])
    // public onPopState(e) {
    //    console.log(this.api.getDefaultMedia().time);
    // }
}
