import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { EditProfileComponent } from "../edit-profile/edit-profile.component";
import { error } from 'console';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf, EditProfileComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  name:string =''
  profilePic:string | null =null
  email:string=''
  isEditMode: boolean = false;
  currentUserId: any
  loading = false
  constructor(private authService:AuthService){}

  async ngOnInit(){
    
    this.authService.currentUser$.subscribe((user) => {
      this.currentUserId = user?.uid
      this.authService.getProfile(this.currentUserId).then((data) =>{
        if(data){
          this.name = data.name
          this.profilePic = data.profilePic
          this.email = data.email
        }
      })
    })
  }

   // Toggle edit mode
   toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  async updateProfile(updatedName: string, updatedProfilePicture: string) {
    if(this.currentUserId){
      this.loading = true
      this.authService.updateUserProfile(this.currentUserId, updatedName,updatedProfilePicture).subscribe({
        next : () => {
          this.name = updatedName
          this.profilePic = updatedProfilePicture
          this.isEditMode = false
        },
        error : (error) =>{
          console.log('Error updating profile ' ,error);
          alert('failed to update')
        },
        complete : () => {
            this.loading =false
        },
      })
    }
      
  }
}
