import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainDisplayComponent } from './main/main.component';
import { CountryDataComponent } from './countrydata/countrydata.component';
import { statedataComponent } from './statedata/statedata.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'home', redirectTo: '/home/country', pathMatch: 'full' },
  {
    path: 'home',
    component: MainDisplayComponent,
    children: [
      {
        path: 'country',
        component: CountryDataComponent,
      },
      {
        path: 'state/:id',
        component: statedataComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}