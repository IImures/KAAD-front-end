import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationalListService {

  activeLinkIndex = -1;

  constructor() { }

  public isActive(index: number) {
    return index === this.activeLinkIndex;
  }

  public setActive(index: number) {
    this.activeLinkIndex = index;
  }
}
