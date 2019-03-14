import { AuthService } from "src/app/auth/auth.service";
import { Article } from "./../models/article.model";
import { Profile } from "./../models/profile.model";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs/operators";
import { DataService } from "../data.service";
import { Author } from "../models/author.model";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  username: string;
  profileInfo: Profile;
  articles: {
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
  }[];
  condition = false;
  following: boolean;
  empty: boolean;
  pagiList = [];
  loaded = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private auth: AuthService,
    private route: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.data
      .pipe(
        map(data => {
          return data.profile.profile;
        })
      )
      .subscribe(data => {
        this.dataService.getProfile(data.username).subscribe(
          (params: { profile: Profile }) => {
            this.username = data.username;
            this.condition = false;
            this.profileInfo = params.profile;
          },
          err => {
            this.route.navigateByUrl("/");
          }
        );
      });
    this.myArticleLoad();
  }

  myArticleLoad() {
    this.condition = false;
    this.loaded = false;
    this.articles = null;
    this.activatedRoute.params.subscribe(params => {
      this.dataService
        .getAllUserArticle(params.username)
        .subscribe((articleLists: Article) => {
          this.loaded = true;
          this.pagiList = [];
          if (articleLists.articlesCount % 10 == 0) {
            for (let i = 1; i <= articleLists.articlesCount / 10; i++) {
              this.pagiList.push(i);
            }
          } else {
            for (let i = 1; i <= articleLists.articlesCount / 10 + 1; i++) {
              this.pagiList.push(i);
            }
          }
          // console.log(this.pagiList)
          this.articles = articleLists.articles;
          if (this.articles.length !== 0) {
            this.empty = false;
          } else {
            this.empty = true;
          }
        });
    });
  }

  myFavouriteLoad() {
    this.condition = true;
    this.loaded = false;
    this.articles = null;
    this.activatedRoute.params.subscribe(params => {
      this.dataService
        .getFavouriteArticle(params.username)
        .subscribe((articleLists: Article) => {
          this.loaded = true;
          this.pagiList = [];
          if (articleLists.articlesCount % 10 == 0) {
            for (let i = 1; i <= articleLists.articlesCount / 10; i++) {
              this.pagiList.push(i);
            }
          } else {
            for (let i = 1; i <= articleLists.articlesCount / 10 + 1; i++) {
              this.pagiList.push(i);
            }
          }
          // console.log(this.pagiList)
          this.articles = articleLists.articles;

          if (this.articles.length !== 0) {
            this.empty = false;
          } else {
            this.empty = true;
          }
        });
    });
  }

  isUser() {
    if (this.auth.checkUser()) {
      return this.auth.checkUser().user.username;
    } else {
      return false;
    }
  }

  followUser(profileInfo) {
    profileInfo.following = true;
    this.activatedRoute.params.subscribe(params => {
      this.dataService
        .followUser(params.username)
        .subscribe((val: { profile: Profile }) => {
          // this.following = val.profile.following;
        });
    });
  }

  unfollowUser(profileInfo) {
    profileInfo.following = false;
    this.activatedRoute.params.subscribe(params => {
      this.dataService
        .unfollowUser(params.username)
        .subscribe((val: { profile: Profile }) => {
          // this.following = val.profile.following;
        });
    });
  }
  getnewpagi(value) {
    if (this.condition == false) {
      this.dataService
        .getAllUserArticleWithOffset(
          this.username,
          ((value - 1) * 10).toString()
        )
        .subscribe((param: Article) => {
          this.articles = param.articles;
        });
    }
    if (this.condition == true) {
      this.dataService
        .getFavouriteArticleWithOffSet(
          this.username,
          ((value - 1) * 10).toString()
        )
        .subscribe((param: Article) => {
          this.articles = param.articles;
        });
    }
  }
}
