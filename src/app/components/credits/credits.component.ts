import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VgAPI } from 'videogular2/core';
import { Subscription } from 'rxjs';

import { NotifyService } from '../../modules/ui/notify/notify.service';
import { UserService } from '../../modules/user/user.service';

@Component({
    selector: 'credits',
    templateUrl: 'credits.component.html',
    styleUrls: ['credits.component.css']
})

export class CreditsComponent implements OnInit, OnDestroy {

    public api: VgAPI;

    private playing: Subscription;

    constructor(private notify: NotifyService,
                public userService: UserService, private router: Router,
                private route: ActivatedRoute) {}

    public ngOnInit(): void {}

    public ngOnDestroy(): void {
        this.playing.unsubscribe();
    }

    public onPlayerReady(api: VgAPI) {

        this.api = api;

        this.playing = this.api.getDefaultMedia().subscriptions.playing.subscribe(
            () => console.log(this.api.getDefaultMedia().time)
        );
    }

    @HostListener('window:beforeunload', [ '$event' ])
    public beforeUnloadHander(e) {
        console.log(this.api.getDefaultMedia().time);
    }

    @HostListener('window:popstate', ['$event'])
    public onPopState(e) {
       console.log(this.api.getDefaultMedia().time);
    }
}
