import { Component } from '@angular/core';
import { UserService } from '../../modules/user/user.service';

@Component({
  selector: 'no-content',
  templateUrl: 'no-content.component.html',
  styleUrls: ['no-content.component.css']

})
export class NoContentComponent {

  constructor(public service: UserService) {}

}
