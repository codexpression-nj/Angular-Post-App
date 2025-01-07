import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { error } from 'console';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email=''

  constructor(private authService:AuthService) {
  }

  resetPassword(){
      this.authService.resetPassword(this.email)
      .then(() => console.log('email sent'))
      .catch((error) => console.log(error) )
  }
  
}
