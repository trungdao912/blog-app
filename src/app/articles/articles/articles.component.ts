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
  constructor(private dataservice: DataService) {}
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
  react(item) {
    if (item.favorited == false) {
      item.favorited = true;
      item.favoritesCount += 1;
      this.dataservice.favouritePost(item.slug).subscribe();
    } else {
      item.favorited = false;
      item.favoritesCount -= 1;
      this.dataservice.unfavouritePost(item.slug).subscribe();
    }
  }
}
