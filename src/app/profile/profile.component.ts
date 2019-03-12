import { AuthService } from 'src/app/auth/auth.service';
import { Article } from './../models/article.model';
import { Profile } from './../models/profile.model';
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs/operators";
import { DataService } from "../data.service";
import { Author } from '../models/author.model';


@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  username: string;
  profileInfo: Profile;
  articles: {
    title:          string;
    slug:           string;
    body:           string;
    createdAt:      string;
    updatedAt:      string;
    tagList:        string[];
    description:    string;
    author:         Author;
    favorited:      boolean;
    favoritesCount: number;
  }[];
  condition: boolean;
  following: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private auth: AuthService,
    private route: Router
  ) {

  }

  ngOnInit() {
    this.activatedRoute.data
    .pipe(
      map(data => {
        return data.profile.profile;
      })
    )
    .subscribe(data => {
      this.dataService.getProfile(data.username).subscribe((params: { profile: Profile }) => {
        this.profileInfo = params.profile;
      }, ((err) => {
        this.route.navigateByUrl('/')
      }));
    });
    this.myArticleLoad();
  }

  myArticleLoad() {
    this.condition = false;
    this.activatedRoute.params.subscribe((params) => {
      this.dataService.getAllUserArticle(params.username).subscribe((articleLists: Article) => {
        this.articles = articleLists.articles;
      });
    });
  }

  myFavouriteLoad() {
    this.condition = true;
    this.activatedRoute.params.subscribe((params) => {
      this.dataService.getFavouriteArticle(params.username).subscribe((articleLists: Article) => {
        this.articles = articleLists.articles;
      });
    });
  }

  isUser() {
    return this.auth.checkUser().user.username;
  }

  followUser(profileInfo) {
    profileInfo.following = true;
    this.activatedRoute.params.subscribe((params) => {
      this.dataService.followUser(params.username).subscribe((val: {profile: Profile}) => {
        // this.following = val.profile.following;
      });
    });
  }

  unfollowUser(profileInfo) {
    profileInfo.following = false;
    this.activatedRoute.params.subscribe((params) => {
      this.dataService.unfollowUser(params.username).subscribe((val: {profile: Profile}) => {
        // this.following = val.profile.following;
      });
    });
  }
}
