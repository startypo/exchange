import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { NotifyService } from '../../modules/ui/notify/notify.service';
import { UserService } from '../../modules/user/user.service';

@Component({
    selector: 'credits',
    templateUrl: 'credits.component.html',
    styleUrls: ['credits.component.css']
})

export class CreditsComponent implements OnInit, OnDestroy {


    constructor(private notify: NotifyService,
                public userService: UserService, private router: Router,
                private route: ActivatedRoute) {}

    public ngOnInit(): void {
    }

    public ngOnDestroy(): void {
    }
}
