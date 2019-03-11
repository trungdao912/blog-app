import { Component, OnInit } from "@angular/core";
import { ArticleInfor } from "src/app/models/aritcleInfor.model";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "src/app/data.service";
import { map } from "rxjs/operators";


@Component({
  selector: "app-comment",
  templateUrl: "./comment.component.html",
  styleUrls: ["./comment.component.css"]
})
export class CommentComponent implements OnInit {
  comment
  constructor(
    private activateRoute: ActivatedRoute,
    private dataService: DataService
  ) {
    this.activateRoute.data
      .pipe(
        map(data => {
          return data.profile.article;
        })
      )
      .subscribe((data: ArticleInfor) => {
        this.dataService.getComments(data.slug).subscribe((param) => {
          this.comment = param;
          console.log(this.comment);
        });
      });
  }

  ngOnInit() {}
}
