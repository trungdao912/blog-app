import { AuthService } from "src/app/auth/auth.service";
import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/data.service";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
import { ArticleInfor } from "src/app/models/aritcleInfor.model";
import { Profile } from "selenium-webdriver/firefox";

@Component({
  selector: "app-article-infomation",
  templateUrl: "./article-infomation.component.html",
  styleUrls: ["./article-infomation.component.css"]
})
export class ArticleInfomationComponent implements OnInit {
  articleInfor: ArticleInfor;
  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private auth: AuthService
  ) {
    this.activatedRoute.data
      .pipe(
        map(data => {
          return data.profile.article;
        })
      )
      .subscribe((data: ArticleInfor) => {
        this.articleInfor = data;
      });
  }

  ngOnInit() {}

  isUser() {
    if (this.auth.checkUser()) {
      return this.auth.checkUser().user.username;
    } else {
      return false;
    }
  }

  followUser(articleInfor) {
    articleInfor.author.following = true;
    this.dataService
      .followUser(articleInfor.author.username)
      .subscribe((val: { profile: Profile }) => {
        // this.following = val.profile.following;
      });
  }

  unfollowUser(articleInfor) {
    articleInfor.author.following = false;
    this.dataService
      .unfollowUser(articleInfor.author.username)
      .subscribe((val: { profile: Profile }) => {
        // this.following = val.profile.following;
      });
  }

  unfavorite(articleInfor) {
    articleInfor.favorited = false;
    articleInfor.favoritesCount -= 1;
    this.dataService
      .unfavouritePost(articleInfor.slug)
      .subscribe((val: { profile: Profile }) => {
        // this.following = val.profile.following;
      });
  }

  favorite(articleInfor) {
    articleInfor.favorited = true;
    articleInfor.favoritesCount += 1;
    this.dataService
      .favouritePost(articleInfor.slug)
      .subscribe((val: { profile: Profile }) => {
        // this.following = val.profile.following;
      });
  }
}
