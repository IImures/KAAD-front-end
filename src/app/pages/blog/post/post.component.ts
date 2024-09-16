import {Component, Input, OnInit} from '@angular/core';
import {PostDetails} from "../../../interfaces/post-details";
import {NgIf} from "@angular/common";

const months = [
  'stycznia',
  'lutego',
  'marca',
  'kwietnia',
  'maja',
  'czerwca',
  'lipca',
  'sierpnia',
  'września',
  'października',
  'listopada',
  'grudnia'
];

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit{


  @Input() post!: PostDetails;

  wordCollapseLimit : number = 100;
  isPostHidden!: boolean;

  processTime(created_at: string) {
    let date = new Date(parseInt(created_at));
    let diffTime = this.getDiffTime(date);

    if(diffTime.totalHours > 8){
      return this.getFullTime(date);
    }else{
      return this.getShortTime(diffTime);
    }


  }

  private getFullTime(date : Date) :string {
    const year : string = String(date.getFullYear());
    const month = months[date.getMonth()];
    const day = date.getDate() < 10 ? '0' + String(date.getDate()) : String(date.getDate());

    const hour = date.getHours() < 10 ? '0' + String(date.getHours()) : String(date.getHours());
    const minute = date.getMinutes() < 10 ? '0' + String(date.getMinutes()) : String(date.getMinutes());
    return day + ' ' + month + ' '+ year + ' ' + hour + ':' + minute;
  }

  private getShortTime(diffTime: any) : string {
    if (diffTime.totalHours > 0) {
      const hours = diffTime.totalHours;
      if (hours === 1) {
        return `${hours} godzinę temu`;
      } else if (hours >= 2 && hours <= 4) {
        return `${hours} godziny temu`;
      } else {
        return `${hours} godzin temu`;
      }
    } else {
      const minutes = diffTime.totalMinutes;
      if (minutes === 1) {
        return `${minutes} minuta temu`;
      } else if (minutes >= 2 && minutes <= 4) {
        return `${minutes} minuty temu`;
      } else {
        return `${minutes} minut temu`;
      }
    }
  }

  private getDiffTime(date: Date) {
    const now = new Date();

    const milliDiff: number = Math.abs(now.getTime() - date.getTime());

    const totalSeconds = Math.floor(milliDiff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);

    return {
      milliDiff,
      totalSeconds,
      totalMinutes,
      totalHours,
    };
  }

  ifHidePost() {
    return this.post.contentLength > this.wordCollapseLimit;
  }

  togglePost() {
    this.isPostHidden = !this.isPostHidden;
  }

  ngOnInit(): void {
    this.isPostHidden = this.ifHidePost();
  }
}
