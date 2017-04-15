import { Routes } from '@angular/router';

import { NoContentComponent } from './components/no-content';
import { HomeComponent } from './components/home';
import { RegisterComponent } from './modules/users/register.component';
import { LoginComponent } from './modules/users/login.component';
import { AssetListComponent } from './components/asset-list';
import { AssetDetailComponent } from './components/asset-detail';


export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'register',  component: RegisterComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'assets',  component: AssetListComponent },
  { path: 'asset',  component: AssetDetailComponent },
  { path: '**',    component: NoContentComponent }
];
