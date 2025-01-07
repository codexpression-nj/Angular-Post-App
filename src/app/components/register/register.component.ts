import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { error } from 'console';
import { Route, Router, RouterLink } from '@angular/router';

// import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email = ''
  name = ''
  password = ''
  profilePic :any


  constructor(private authService: AuthService,private route:Router) { }
  handleFileInput(event:any){
    const pic = event.target.files[0]
    if(pic){
      const reader = new FileReader()
      reader.onload =() =>{
        this.profilePic = reader.result as string
      }
      reader.readAsDataURL(pic)
    }

  }

   async register() {
    try {
      await this.authService.register(this.email, this.password, this.name,this.profilePic)
      this.route.navigate(['./dashboard'])
      console.log('registered')
    } catch (error) {
      console.log(error)
    }

  }

}
