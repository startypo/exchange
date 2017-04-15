import { Routes } from '@angular/router';

import { NoContentComponent } from './components/no-content';
import { HomeComponent } from './components/home';
import { ListAssetsComponent } from './components/list-assets';
import { RegisterComponent } from './modules/users/register.component';
import { LoginComponent } from './modules/users/login.component';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'register',  component: RegisterComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'assets',  component: ListAssetsComponent },
  { path: '**',    component: NoContentComponent }
];
