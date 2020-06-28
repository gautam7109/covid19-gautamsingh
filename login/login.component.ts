import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataserverService } from '../dataserver.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  requesting;

  profileForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private service: DataserverService,
    private toastr: ToastrService
  ) {
    this.requesting = false;
    //verifylogin
    if (localStorage.getItem('covid_app_token')) {
      this._router.navigate(['/home']);
      this.toastr.success('Logged In!');
    }
    this.profileForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),

      pass: this.fb.control('', [Validators.required]),
    });
  }

  ngOnInit(): void {}
  login() {
    this.requesting = true;
    console.log(this.profileForm.value);
    let loginUrl = 'https://zen-user-api.herokuapp.com/users/authenticate';
    this.service
      .requestServer(loginUrl, this.mapVals(this.profileForm.value))
      .subscribe(
        (responce) => {
          console.log(responce);
          localStorage.setItem('covid_app_token', responce['token']);
          this._router.navigate(['/home']);
          this.toastr.success('Logged In!');
        },
        (error) => {
          this.requesting = false;
          if (!error['error']['message']) {
            this.toastr.error('Network Error!');
            return;
          }
          console.log(error['error']['message']);
          this.toastr.error(error['error']['message']);
        }
      );
  }
  guestLogin() {
    localStorage.setItem('covid_app_token', 'guestToken');
    this._router.navigate(['/home']);
    this.toastr.success('Logged In!');
  }
  mapVals(obj) {
    return {
      email: obj['email'],
      password: obj['pass'],
    };
  }
}
