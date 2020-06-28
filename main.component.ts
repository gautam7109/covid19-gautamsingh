import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainDisplayComponent implements OnInit {
  constructor(private _router: Router, private toastr: ToastrService) {
    //verifylogin
    if (!localStorage.getItem('covid_app_token')) {
      this._router.navigate(['/login']);
      this.toastr.warning('You are not  Logged in!');
    }
  }

  ngOnInit(): void {}
  signOut() {
    localStorage.removeItem('covid_app_token');
    this._router.navigate(['/login']);
    this.toastr.warning('Logged Out!');
  }
}
