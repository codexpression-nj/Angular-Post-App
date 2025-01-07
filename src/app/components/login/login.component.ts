import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { error } from 'console';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    email =''
    password = ''
    loading = false
    user :any

    constructor(private authService:AuthService,private router :Router){}

    onLogin(){
      this.loading = true
      this.authService.login(this.email,this.password)
      .then((userData) =>{
        this.router.navigate(['./dashboard'])
        this.user = userData
        console.log(this.user);
        
        this.loading = false
        this.authService.getProfile(this.user.uid).then((data)=>{
          console.log(data);
        })
       } )
      .catch((error) => console.log(error)
      )
      }


}
