import { AuthService } from "./../auth/auth.service";
import { Article } from "./../models/article.model";
import { Author } from "./../models/author.model";
import { DataService } from "./../data.service";
import { Component, OnInit } from "@angular/core";
import { TagService } from "./tag.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  articlesList: Article;
  condition: boolean;
  loggedIn: boolean;
  loaded = false;
  optionArr = ["Global Feed", "Your Feed", ""];
  currIndex = 0;
  pagilist = [];
  currenttag:string

  constructor(
    private auth: AuthService,
    private data: DataService,
    private tagservice: TagService
  ) {}

  ngOnInit() {
    this.auth.isAuthentiCated();
    this.auth.isAuthenticate.subscribe(boo => {
      this.condition = boo;

      if (this.condition) {
        this.loggedIn = true;
        this.condition = false;
      } else {
        this.loggedIn = false;
      }
    });
    this.currIndex = 0;
    this.onChange(this.optionArr[0]);

    this.tagservice.currentMessage.subscribe(message => {
      this.currenttag= message
      this.optionArr[2] = message;
      if (this.optionArr[2] !== "") {
        this.currIndex = 2;
      }
      // console.log(this.optionArr);
      this.data.getArticleTag(message).subscribe((param: Article) => {
        // console.log(1); // mess = ''
        // this.articlesList = param;
        // console.log(param);
        if (message) {
          this.articlesList = param;
          this.pagilist = [];
          for (var i = 1; i <= param.articlesCount / 10; i++) {
            this.pagilist.push(i);
          }
        }
      });
    });
  }

  onChange(event) {
    if (event === this.optionArr[0]) {
      this.currIndex = 0;
      this.data.getAllArticles().subscribe((list: Article) => {
        this.articlesList = list;
        this.loaded = true;
        this.optionArr[2] = "";
        this.pagilist = [];
        for (let i = 1; i <= list.articlesCount / 10; i++) {
          this.pagilist.push(i);
        }
      });
    } else if (event === this.optionArr[1]) {
      this.currIndex = 1;
      this.data.getUserArticles().subscribe((list: Article) => {
        this.articlesList = list;
        this.loaded = true;
        this.optionArr[2] = "";
        this.pagilist = [];
        for (let i = 1; i <= list.articlesCount / 10; i++) {
          this.pagilist.push(i);
        }
      });
    }
  }

  onToggleFavorite(article) {
    if (article.favorited == false) {
      article.favorited = true;
      article.favoritesCount += 1;
      this.data.favouritePost(article.slug).subscribe();
    } else {
      article.favorited = false;
      article.favoritesCount -= 1;
      this.data.unfavouritePost(article.slug).subscribe();
    }
  }
  getnewpagi(value) {
    if (this.currIndex == 0) {
      // console.log("haha")
      this.data
        .getPagiHome("", ((value - 1) * 10).toString())
        .subscribe((list: Article) => {
          this.articlesList = list;
        });
    }
    if (this.currIndex == 2) {
    
        this.data
          .getPagiHome(this.currenttag, ((value - 1) * 10).toString())
          .subscribe((list: Article) => {
            this.articlesList = list;
          });
  

      // console.log("hihi")
    }
  }
}
