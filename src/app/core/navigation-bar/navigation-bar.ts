import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location, NgIf } from '@angular/common';

@Component({
  selector: 'app-navigation-bar',
  imports: [NgIf],
  templateUrl: './navigation-bar.html',
  styleUrl: './navigation-bar.css',
})
export class NavigationBar {
  path: string = '';

  constructor(
    private router: Router,
    private location: Location,
  ) {
    this.router.events.subscribe((val) => {
      this.path = this.location.path(); // Get the current path
    });
  }
}
