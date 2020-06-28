import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataserverService } from '../dataserver.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  requesting;
  profileForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private service: DataserverService,
    private toastr: ToastrService
  ) {
    this.requesting = false;
    this.profileForm = this.fb.group({
      fname: this.fb.control('', [
        Validators.required,
        Validators.pattern('[a-zA-Z]{2,}'),
      ]),
      lname: this.fb.control('', [
        Validators.required,
        Validators.pattern('[a-zA-Z]{2,}'),
      ]),
      email: this.fb.control('', [Validators.required, Validators.email]),

      pass: this.fb.control('', [Validators.required, Validators.minLength(4)]),
      rpass: this.fb.control('', Validators.required),
    });
  }

  ngOnInit(): void {}

  updatePatt() {
    this.profileForm
      .get('rpass')
      .setValidators([
        Validators.required,
        Validators.pattern(this.profileForm.get('pass').value),
      ]);
    this.profileForm
      .get('rpass')
      .updateValueAndValidity({ onlySelf: false, emitEvent: true });
  }

  register() {
    this.requesting = true;
    console.log(this.profileForm.value);
    let loginUrl = 'https://zen-user-api.herokuapp.com/users/register';
    this.service
      .requestServer(loginUrl, this.mapVals(this.profileForm.value))
      .subscribe(
        (responce) => {
          console.log(responce);
          this._router.navigate(['/login']);
          this.toastr.success(responce['message']);
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
  mapVals(obj) {
    return {
      firstName: obj['fname'],
      lastName: obj['lname'],
      email: obj['email'],
      password: obj['pass'],
    };
  }
}
