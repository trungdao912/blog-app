import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  currentUser: {
    id: number;
    email: string;
    createdAt: string;
    updatedAt: string;
    username: string;
    bio: null;
    image: string;
    token: string;
  };
  settingForm: FormGroup;
  constructor(private auth: AuthService, private data: DataService, private router: Router) { }

  ngOnInit() {
    this.currentUser = this.auth.userInfo();

    this.settingForm = new FormGroup({
      'image': new FormControl(this.currentUser.image),
      'username': new FormControl(this.currentUser.username),
      'bio': new FormControl(this.currentUser.bio),
      'email': new FormControl(this.currentUser.email, [Validators.email]),
      'password': new FormControl(null)
    });
  }

  onSubmit() {
    console.log(this.settingForm);
    // tslint:disable-next-line:max-line-length
    this.data.updateUser(this.settingForm.value.image, this.settingForm.value.username, this.settingForm.value.bio, this.settingForm.value.email, this.settingForm.value.password)
      .subscribe((data: User) => {
        this.router.navigateByUrl('/');
        this.auth.updateUserInFoInLocalStorage(data);
        this.auth.user.next(data);
        return;
      });
  }

  onLogout() {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }

}
