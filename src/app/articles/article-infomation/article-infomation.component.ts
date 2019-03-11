import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/data.service";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";


@Component({
  selector: "app-article-infomation",
  templateUrl: "./article-infomation.component.html",
  styleUrls: ["./article-infomation.component.css"]
})
export class ArticleInfomationComponent implements OnInit {
  constructor(
    private activateRoute: ActivatedRoute,
    private dataService: DataService
  ) {
    this.activateRoute.data.pipe(
      map(data => {
       return data.profile.article
      })
    ).subscribe(data =>{
      console.log(data)
    });
  }

  ngOnInit() {}
}
