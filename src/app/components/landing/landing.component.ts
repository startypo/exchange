import { Component, OnInit } from '@angular/core';
import { UserService } from '../../modules/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./style.scss', './landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  public ngOnInit(): void {

    if (this.userService.isLoggedIn())
      this.router.navigate(['/main']);
  }
}
