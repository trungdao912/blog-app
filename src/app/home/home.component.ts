import { AuthService } from './../auth/auth.service';
import { Article } from './../models/article.model';
import { Author } from './../models/author.model';
import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  articlesList: Article;
  condition: boolean;
  loggedIn: boolean;

  constructor(private auth: AuthService, private data: DataService) { }

  ngOnInit() {
    this.auth.isAuthentiCated();
    this.auth.isAuthenticate.subscribe((boo) => {
      this.condition = boo;

      if (this.condition) {
        this.loggedIn = true;
        this.condition = false;
      } else {
        this.loggedIn = false;
      }
    });
    this.onChange('Global Feed');
  }

  onChange(event) {
    if (event === 'Global Feed') {
      this.condition = false;
      this.data.getAllArticles().subscribe((list: Article) => {
        this.articlesList = list;
        console.log(list.articles);
      });
    }
    else if (event === 'Your Feed') {
      this.condition = true;
      this.data.getUserArticles().subscribe((list: Article) => {
        this.articlesList = list;
      });
    }
  }

  onToggleFavorite() {

  }

}
