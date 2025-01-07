import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from "./layout/toolbar/toolbar.component";
import { AuthService } from './services/auth.service';
import { NgIf } from '@angular/common';
import { LoginComponent } from "./components/login/login.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent, NgIf, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  loading = true
  user: any

  constructor(private authService: AuthService) {

  }

  async ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
    });
  }
}