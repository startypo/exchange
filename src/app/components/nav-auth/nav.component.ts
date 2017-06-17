import { Component, AfterViewInit, OnDestroy, ElementRef, Renderer, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { UserService } from '../../modules/user';
import { EventService } from '../../services/event.service';

@Component({
    selector: 'xchs-nav-auth',
    templateUrl: 'nav.component.html',
    styleUrls: ['./style.scss', 'nav.component.css']
})
export class NavAuthComponent implements AfterViewInit, OnDestroy {

    @ViewChild('overlay') private overlay: ElementRef;
    @ViewChild('menu') private menu: ElementRef;

    private onMenuClick: Subscription;

    constructor(private service: EventService, public userService: UserService,
                private renderer: Renderer, private router: Router) {}

    public ngAfterViewInit(): void {

        this.onMenuClick = this.service.onMenuClick.subscribe((e: Event) => {
            this.showMenu();
        });

        this.renderer.listen(this.overlay.nativeElement, 'click', () => {
            this.hideMenu();
        });
    }

    public showMenu() {
        this.renderer.setElementStyle(this.overlay.nativeElement, 'display', 'block');
        this.renderer.setElementStyle(this.menu.nativeElement, 'left', '0');
    }

    public hideMenu() {
        this.renderer.setElementStyle(this.overlay.nativeElement, 'display', 'none');
        this.renderer.setElementStyle(this.menu.nativeElement, 'left', '-100%');
    }

    public ngOnDestroy(): void {
        this.onMenuClick.unsubscribe();
    }

    public logout() {
        this.userService.logout();
        this.router.navigate(['/']);
    }
}
