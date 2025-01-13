import {Component, OnInit} from '@angular/core';
import {PostDetails} from "../../interfaces/post-details";
import {BlogService} from "../../services/blog.service";
import {NgForOf} from "@angular/common";
import {PostComponent} from "./post/post.component";
import {PostCreateComponent} from "./post-create/post-create.component";

@Component({
  selector: 'app-post-edit',
  standalone: true,
  imports: [
    NgForOf,
    PostComponent,
    PostCreateComponent
  ],
  templateUrl: './post-edit.component.html',
  styleUrl: './post-edit.component.scss'
})
export class PostEditComponent implements OnInit {

  postsDetails: PostDetails[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  limit: number = 1;

  constructor(
    private blogService: BlogService,
  ) {
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.blogService.getPostsByAuthor(this.limit, this.currentPage - 1).subscribe(response => {
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
