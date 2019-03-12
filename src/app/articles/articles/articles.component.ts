import { AuthService } from "./../../auth/auth.service";
import { Component, OnInit, Input } from "@angular/core";
import { DataService } from "src/app/data.service";
import { Article } from "src/app/models/article.model";
import { Author } from "src/app/models/author.model";

@Component({
  selector: "app-articles",
  templateUrl: "./articles.component.html",
  styleUrls: ["./articles.component.css"]
})
export class ArticlesComponent implements OnInit {
  condition = true;
  data = true;
  @Input() article: {
    title: string;
    slug: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    tagList: string[];
    description: string;
    author: Author;
    favorited: boolean;
    favoritesCount: number;
  };

  constructor(private dataservice: DataService, private auth: AuthService) {}

  ngOnInit() {}
  react(item) {
    if (item.favorited === false) {
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
