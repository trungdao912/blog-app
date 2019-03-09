import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
import { DataService } from "../data.service";
import { Profile } from "selenium-webdriver/firefox";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  username: string;
  profileInfo: Profile;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) {
    this.activatedRoute.data
      .pipe(
        map(data => {
          return data.profile.profile;
        })
      )
      .subscribe(data => {
        this.username = data.username;
      });
  }

  ngOnInit() {
    this.dataService.exchangeUsename(this.username)
    this.dataService.getProfile(this.username).subscribe((params: { profile: Profile }) => {
      this.profileInfo = params.profile;
    });
  }
}
