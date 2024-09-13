import { Component } from '@angular/core';
import {PostComponent} from "./post/post.component";
import {PostDetails} from "../../interfaces/post-details";
import {NgForOf} from "@angular/common";

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
export class BlogComponent {
  postsDetails: PostDetails[] = [
    {
      postId: '1',
      author: 'Adrian Dzienkiewicz',
      createdAt: '1700000000000',
      content: 'Informue bla bla bla',
      contentLength: 3
    },
    {
      postId: '2',
      author: 'Adrian Dzienkiewicz',
      createdAt: '2024-02-10',
      content: '1725450606473',
      contentLength: 3
    },
    {
      postId: '3',
      author: 'Adrian Dzienkiewicz',
      createdAt: '1725460004900',
      content: 'Informue bla bla bla',
      contentLength: 3
    },
    // {
    //   postId: '4',
    //   author: 'Adrian Dzienkiewicz',
    //   created_at: '1725400686473',
    //   content: 'Informue blaerg erg erw gerw gerw g ewg ewt gerw gewr tg etrwg ewtr g ewttr gew rqg ewr ge wg ewr g ewg ew gew g wssssdddsasdacsadcasdcsdasacsdcsdacsadcsacsdadscadscacdsadcsadcsadcsdcsadscadcadcsdcasdcasdcadacsdcasdcasdacsdcasdcsadcsdcsdcsaadcadcsacdsasdcasdcasd' +
    //     'csadcsadcdsacascasdcsadcsdacsdacs' +
    //     'acsdcdsacasdcddcsaacdscdsacdasdcasdcsadcsadce' +
    //     'wdr g ewrg w erg erw gwer gw erg w gtw wgt gtw gtw tgwtgw tw tg t gtr bla bla',
    //   contentLength: 3
    // },
  ]
}
