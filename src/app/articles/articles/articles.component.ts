import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/data.service";
import { Article } from "src/app/models/article.model";
import { log } from "util";

@Component({
  selector: "app-articles",
  templateUrl: "./articles.component.html",
  styleUrls: ["./articles.component.css"]
})
export class ArticlesComponent implements OnInit {
  articlesList: Article;
  constructor(private dataservice: DataService) {}
  ngOnInit() {
    this.dataservice.getUserArticles().subscribe((params: Article) => {
      this.articlesList = params;
      console.log();
    });
  }

  getTypeArticles(value) {
    if (value == "myArticles") {
      this.dataservice.getUserArticles().subscribe((params: Article) => {
        this.articlesList = params;
      });
    }
    if (value == "farAriticles") {
      this.dataservice
        .getFavouriteArticle(this.dataservice.currentUser)
        .subscribe((params: Article) => {
          this.articlesList = params;
        });
    }
  }
  react(value) {
    for (var i = 0; i < this.articlesList.articles.length; i++) {
      if (value == this.articlesList.articles[i].slug) {
        console.log(this.articlesList.articles[i].favorited);
        if (this.articlesList.articles[i].favorited == true) {
          this.articlesList.articles[i].favoritesCount -= 1;
          this.articlesList.articles[i].favorited =false
          this.dataservice
            .unfavouritePost(this.articlesList.articles[i].slug)
            .subscribe();
        } else {
          this.articlesList.articles[i].favoritesCount += 1;
          this.articlesList.articles[i].favorited =true

          this.dataservice
            .favouritePost(this.articlesList.articles[i].slug)
            .subscribe();
        }
      }
    }
  }
}
