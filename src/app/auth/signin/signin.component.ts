import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  myForm: FormGroup;
  errors;
  loading = false;

  constructor(private form: FormBuilder, private auth: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.myForm = this.form.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
    this.auth.errorsMessNew.subscribe((err) => {
      this.errors = err;
    });
  }

  onSubmit() {
    this.loading = true;
    this.auth.login(this.myForm.get('email').value, this.myForm.get('password').value);
  }
}
