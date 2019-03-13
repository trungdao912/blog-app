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
  currentUser: User;
  settingForm: FormGroup;
  errors;

  constructor(private auth: AuthService, private data: DataService, private router: Router) { }

  ngOnInit() {
    this.currentUser = this.auth.checkUser();

    this.settingForm = new FormGroup({
      'image': new FormControl(this.currentUser.user.image),
      'username': new FormControl(this.currentUser.user.username),
      'bio': new FormControl(this.currentUser.user.bio),
      'email': new FormControl(this.currentUser.user.email, [Validators.email]),
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
      }, (err) => {
        this.errors = err;
      });
  }

  onLogout() {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }

}
