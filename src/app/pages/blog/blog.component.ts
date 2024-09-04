import { Component } from '@angular/core';
import {PostComponent} from "./post/post.component";

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    PostComponent
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {

}
