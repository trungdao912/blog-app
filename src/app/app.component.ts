import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { UserIdleService } from 'angular-user-idle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'blog-app';

  constructor(private auth: AuthService, private userIdle: UserIdleService) {}

  ngOnInit() {
    this.auth.isAuthentiCated();
    this.userIdle.startWatching();
    this.userIdle.onTimerStart().subscribe(() => {});
    this.userIdle.onTimeout().subscribe(() => {
      alert('You have been idle for too long! Please Log In');
      this.auth.logout();
      location.reload();
    });
  }
}
