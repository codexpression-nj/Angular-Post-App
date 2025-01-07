import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { ToolbarComponent } from "../../layout/toolbar/toolbar.component";
import { FeedPostComponent } from "../feed-post/feed-post.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FeedPostComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private authService:AuthService, private route:Router){}

  
}
