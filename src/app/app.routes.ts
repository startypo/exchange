import { Routes } from '@angular/router';

import { RegisterComponent, LoginComponent, AuthGuard } from './modules/user';
import { NoContentComponent } from './components/no-content';
import { HomeComponent } from './components/home';
import { AssetListComponent } from './components/asset-list';
import { AssetDetailComponent } from './components/asset-detail';
import { AssetEditComponent } from './components/asset-edit';



export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'assets', component: AssetListComponent, canActivate: [AuthGuard] },
  { path: 'assets/search/:term', component: AssetListComponent, canActivate: [AuthGuard] },
  { path: 'assets/new', component: AssetEditComponent, canActivate: [AuthGuard] },
  { path: 'assets/detail/:id', component: AssetDetailComponent, canActivate: [AuthGuard] },
  { path: 'assets/edit/:id', component: AssetEditComponent, canActivate: [AuthGuard] },
  { path: '**', component: NoContentComponent }
];
