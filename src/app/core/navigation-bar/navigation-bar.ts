import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navigation-bar',
  imports: [RouterLink],
  templateUrl: './navigation-bar.html',
  styleUrl: './navigation-bar.css',
  standalone: true,
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
