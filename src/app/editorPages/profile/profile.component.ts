import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  user = {
    id: '123',
    blog_image: 'https://via.placeholder.com/150', // Default image
    email: 'user@example.com',
    first_name: 'John',
    last_name: 'Doe',
    password: '********', // Masked password for display
  };
}
