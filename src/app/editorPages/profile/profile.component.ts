import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {JwtService} from "../../services/jwt.service";
import {LocalStorageService} from "../../services/local-storage.service";
import {environment} from "../../../environments/environment";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {UserDetails} from "../../interfaces/UserDetails";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  imageSrc: string | null = null;

  isEditingPassword: boolean = false;
  newPassword: string = '';

  user = {
    id: '0',
    // blog_image: 'https://via.placeholder.com/150', // Default image
    email: '',
    firstName: 'John',
    lastName: 'Doe',
  };
  selectedImage:  File | null = null;
  imagePreview: string | null = null;

  constructor(private authService: AuthService,
              private jwtService: JwtService,
              private localStorageService: LocalStorageService,
              private http: HttpClient,
              private userService: UserService,
  ) { }

  ngOnInit(): void {
    const token = this.localStorageService.getItem('token');

    if(!token) return;

    const decoded = this.jwtService.decodeToken(token);
    this.user = {
      id: decoded!['id'],
      email:decoded!['sub'] ? decoded!['sub'] : '',
      firstName: decoded!['firstName'],
      lastName: decoded!['lastName'],
    }
    this.fetchProfileImage();
  }

  fetchProfileImage(): void {

    this.http
      .get(`${environment.apiUrl}/${environment.apiVersion}/user/photo`, {responseType: 'blob' })
      .subscribe({
        next: (blob) => {
          this.imageSrc = URL.createObjectURL(blob);
        },
        error: (err) => {
          console.error('Failed to load image', err);
        },
      });
  }


  togglePasswordEdit() {
    this.isEditingPassword = true;
  }

  saveNewPassword() {
    if (this.newPassword.trim().length >= 1) { // change to bigger number

      this.userService.passwordReset(this.newPassword).subscribe({
        next: () => {
          alert('Password reset successfully!');
        },
        error: error => {
          alert(error.error.message);
        }
      })
      this.newPassword = '';
      this.isEditingPassword = false;
    } else {
      alert("Nowe hasło nie podane")
    }
  }

  cancelPasswordEdit() {
    this.isEditingPassword = false;
    this.newPassword = '';
  }


  saveProfile() {
    const userRequest : UserDetails = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email
    }
    const formData = new FormData();
    formData.append('body', new Blob([JSON.stringify(userRequest)], {type: 'application/json'}));
    if(this.selectedImage){
      formData.append('image', this.selectedImage);
    }
    this.userService.updateUserProfile(formData).subscribe({
      next: () => {
        alert('Profile updated successfully!');
      },
      error: (error) => {
        console.error('Failed to update profile', error);
      },
    });

  }

  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      if (file.type.startsWith('image/')) {
        this.selectedImage = file;

        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result as string;
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select a valid image file');
        fileInput.value = '';
      }
    }
  }

  protected readonly environment = environment;

}
