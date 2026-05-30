import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true,
})
export class Login {
  constructor(private router: Router) {}

  ngOnInit() {}

  navToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
