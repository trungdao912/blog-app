import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  condition: boolean;
  profile: User;

  constructor(private auth: AuthService, private data: DataService) {
    this.data.getUser().subscribe((user: User) => {
      this.profile = user;
    });
  }

  ngOnInit() {
    this.auth.isAuthenticate.subscribe((boo) => {
      this.condition = boo;
    });

    this.auth.userEmit.subscribe((user: User) => {
      this.profile = user;
    });
  }

}
