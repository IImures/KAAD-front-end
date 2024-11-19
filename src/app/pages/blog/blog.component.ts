import {Component, OnInit} from '@angular/core';
import {PostComponent} from "./post/post.component";
import {PostDetails} from "../../interfaces/post-details";
import {NgForOf} from "@angular/common";
import {BlogService} from "../../services/blog.service";

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    PostComponent,
    NgForOf
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {
  postsDetails: PostDetails[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  limit: number = 10;

  constructor(
    private blogService: BlogService,
  ) {
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.blogService.getPosts(this.limit, this.currentPage - 1).subscribe(response => {
      console.log(response);
      this.postsDetails = response.content;
      this.totalPages = response.totalPages;
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getPosts();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getPosts();
    }
  }

}
