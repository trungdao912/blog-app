import { Component, OnInit } from "@angular/core";
import { ArticleInfor } from "src/app/models/aritcleInfor.model";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "src/app/data.service";
import { map } from "rxjs/operators";
import { User } from "src/app/models/user.model";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-comment",
  templateUrl: "./comment.component.html",
  styleUrls: ["./comment.component.css"]
})
export class CommentComponent implements OnInit {
  comment;
  user: User;
  ArticlesId: string;
  constructor(
    private activateRoute: ActivatedRoute,
    private dataService: DataService,
    private auth: AuthService
  ) {
    this.user = this.auth.checkUser();
    this.activateRoute.data
      .pipe(
        map(data => {
          return data.profile.article;
        })
      )
      .subscribe((data: ArticleInfor) => {
        this.dataService.getComments(data.slug).subscribe(param => {
          this.comment = param;
          this.ArticlesId = data.slug;
        });
      });
  }

  ngOnInit() {}
  postComment(value: HTMLInputElement) {
    this.dataService.postComment(value.value, this.ArticlesId).subscribe(() => {
      this.dataService.getComments(this.ArticlesId).subscribe(param => {
        this.comment = param;
      });
    });

    value.value = "";
  }

  delete(value) {
    this.dataService.deleteComment(this.ArticlesId, value).subscribe(() => {
      this.dataService.getComments(this.ArticlesId).subscribe(param => {
        this.comment = param;
        console.log(param);
      });
    });
  }
}
