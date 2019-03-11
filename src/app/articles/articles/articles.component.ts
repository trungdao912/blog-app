import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/data.service";
import { Article } from "src/app/models/article.model";


@Component({
  selector: "app-articles",
  templateUrl: "./articles.component.html",
  styleUrls: ["./articles.component.css"]
})
export class ArticlesComponent implements OnInit {
  articlesList: Article;
  constructor(
    private dataservice: DataService,

  ) {}
  ngOnInit() {
    this.dataservice
      .getAllUserArticle(this.dataservice.currentUser)
      .subscribe((params: Article) => {
        this.articlesList = params;
      });
  }

  getTypeArticles(value) {
    if (value == "myArticles") {
      this.dataservice
        .getAllUserArticle(this.dataservice.currentUser)
        .subscribe((params: Article) => {
          this.articlesList = params;
        });
    } else {
      this.dataservice
        .getFavouriteArticle(this.dataservice.currentUser)
        .subscribe((params: Article) => {
          this.articlesList = params;
        });
    }
  }
  react(value) {
    for (var i = 0; i < this.articlesList.articlesCount; i++) {
      if (value == this.articlesList.articles[i].slug) {
        if (this.articlesList.articles[i].favorited == true) {
          this.articlesList.articles[i].favoritesCount -= 1;
          this.articlesList.articles[i].favorited = false;
          this.dataservice
            .unfavouritePost(this.articlesList.articles[i].slug)
            .subscribe();
        } else {
          this.articlesList.articles[i].favoritesCount += 1;
          this.articlesList.articles[i].favorited = true;
          this.dataservice
            .favouritePost(this.articlesList.articles[i].slug)
            .subscribe();
        }
      }
    }
  }

}
