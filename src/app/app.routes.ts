import { Routes } from '@angular/router';

import { RegisterComponent, LoginComponent, AuthGuard } from './modules/user';
import { NoContentComponent } from './components/no-content';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { AssetListComponent } from './components/asset-list';
import { AssetDetailComponent } from './components/asset-detail';
import { AssetEditComponent } from './components/asset-edit';
import { CreditsComponent } from './components/credits/credits.component';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { ExchangeDetailComponent } from './components/exchange-detail/exchange-detail.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'assets', component: AssetListComponent, canActivate: [AuthGuard] },
  { path: 'assets/search/:term', component: AssetListComponent, canActivate: [AuthGuard] },
  { path: 'assets/new', component: AssetEditComponent, canActivate: [AuthGuard] },
  { path: 'assets/detail/:id', component: AssetDetailComponent, canActivate: [AuthGuard] },
  { path: 'assets/edit/:id', component: AssetEditComponent, canActivate: [AuthGuard] },
  { path: 'credits', component: CreditsComponent, canActivate: [AuthGuard] },
  { path: 'exchanges', component: ExchangeComponent, canActivate: [AuthGuard] },
  { path: 'exchanges/detail/:id', component: ExchangeDetailComponent, canActivate: [AuthGuard] },
  { path: '**', component: NoContentComponent }
];
