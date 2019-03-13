import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataService } from '../data.service';
import { User } from './../models/user.model';
import { Router } from '@angular/router';
import { getToken } from '@angular/router/src/utils/preactivation';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // public currentUserInfo = new BehaviorSubject<Object>({});
  // public currentUser = this.currentUserInfo.asObservable();

  public user: BehaviorSubject<User>;
  public userEmit: Observable<User>;

  public isAuthenticated = new BehaviorSubject<boolean>(false);
  public isAuthenticate = this.isAuthenticated.asObservable();

  public errorsMess = new BehaviorSubject<Object>({});
  public errorsMessNew = this.errorsMess.asObservable();

  constructor(private data: DataService, private router: Router) {
    this.user = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.userEmit = this.user.asObservable();
  }

  // emitSignInValue(loginInfo: {}) {
  //   this.currentUserInfo.next(loginInfo);
  // }

  login(email, password) {
    // this.currentUser.subscribe((user: {"email": string, "password": string}) => {
      this.data.getUserLogInInfo(email, password).subscribe((userInfo: User) => {
        if (userInfo && userInfo.user.token) {
          this.router.navigateByUrl('/');
          localStorage.setItem('currentUser', JSON.stringify(userInfo));
          // this.user.next(userInfo);
          this.isAuthenticated.next(true);
          this.errorsMess.next({});
        }
      }, ((errors) => {
        this.errorsMess.next(errors);
      }));
    // });
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  getToken(): string {
    if (!JSON.parse(localStorage.getItem('currentUser'))) {
      return;
    }
    return JSON.parse(localStorage.getItem('currentUser')).user.token;
  }

  isAuthentiCated() {
    if (this.getToken()) {
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  checkUser() {
      return JSON.parse(localStorage.getItem('currentUser'));
  }

  updateUserInFoInLocalStorage(newUser) {
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  }
}
