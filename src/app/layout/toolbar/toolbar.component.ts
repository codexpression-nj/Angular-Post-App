import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
// import {MatSpinnerModule} from '@angular/material/MatSpinnerModule'
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { catchError, Observable, of, Subscription, switchMap } from 'rxjs';
import { error, log } from 'console';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatMenuModule,MatButtonModule,RouterLink ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  user:any 
  loading = true
  userId:any

  constructor(private authService:AuthService, private route:Router, private auth: Auth,private cd: ChangeDetectorRef) {}
   

  ngOnInit() {
   this.load()
  }
 
    load(){
      this.authService.currentUser$.subscribe((user) => {
        this.userId = user?.uid
        this.authService.getProfile(this.userId.uid).then((data) =>{
          console.log(data);
          this.loading = false
          this.user = data
        })
           
      })
    }

  logout(){
    this.authService.logout()
    .then(() =>{
      this.user = null
      this.route.navigate(['./login'])
    }
    )
    .catch((error) => console.log(error)
    )
  }

  // navigateToProfile()
}
