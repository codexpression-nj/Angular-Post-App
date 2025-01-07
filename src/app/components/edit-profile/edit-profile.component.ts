import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [NgIf,CommonModule,FormsModule,],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  @Input() name: string = '';
  @Input() profilePicture: string | null = null;

  @Output() saveProfile = new EventEmitter<{ name: string; profilePicture: string }>();

  updatedName: string = '';
  updatedProfilePicture: string | null = null;

  ngOnInit() {
    this.updatedName = this.name;
    this.updatedProfilePicture = this.profilePicture;
  }

  // Handle file selection
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.updatedProfilePicture = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  saveChanges() {
    this.saveProfile.emit({ name: this.updatedName, profilePicture: this.updatedProfilePicture || '' });
  }
}
