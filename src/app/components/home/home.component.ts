import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./style.scss', './home.component.css']
})
export class HomeComponent implements OnInit {

  public ngOnInit(): void {
    window.scroll(0, 0);
  }
}
