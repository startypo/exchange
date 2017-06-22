import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../modules/user';
import { EventService } from '../../services/event.service';

@Component({
    selector: 'xchs-header',
    templateUrl: 'header.component.html',
    styleUrls: ['./style.scss', './header.component.css']
})
export class HeaderComponent {

    constructor(public service: EventService) {}
}
