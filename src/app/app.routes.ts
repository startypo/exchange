import { Routes } from '@angular/router';

import { NoContentComponent } from './components/no-content';
import { HomeComponent } from './components/home';
import { RegisterComponent } from './modules/users/register.component';
import { LoginComponent } from './modules/users/login.component';
import { AssetListComponent } from './components/asset-list';
import { AssetDetailComponent } from './components/asset-detail';
import { AssetEditComponent } from './components/asset-edit';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'register',  component: RegisterComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'assets',  component: AssetListComponent },
  { path: 'assets/detail/:id',  component: AssetDetailComponent },
  { path: 'assets/edit/:id',  component: AssetEditComponent },
  { path: '**',    component: NoContentComponent }
];
