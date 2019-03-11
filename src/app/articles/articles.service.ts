import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  currentIdArticles: string;
  constructor() {}

  ngOnInit() {}
  exChangeIdArticles(value) {
    this.currentIdArticles = value;
  }
}
