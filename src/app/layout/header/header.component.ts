import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  condition: boolean;
  profile: User;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.isAuthenticate.subscribe((boo) => {
      this.condition = boo;
    })
    this.profile = this.auth.checkUser();
  }

}
