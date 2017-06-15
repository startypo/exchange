import { Routes } from '@angular/router';

import { PublicLayoutComponent } from './components/layouts/public.component';
import { SecureLayoutComponent } from './components/layouts/secure.component';
import { RegisterComponent, LoginComponent, AuthGuard } from './modules/user';
import { NoContentComponent } from './components/no-content';
import { LandingComponent } from './components/landing/landing.component';
import { HomeComponent } from './components/home/home.component';
import { AssetListComponent } from './components/asset-list';
import { AssetDetailComponent } from './components/asset-detail';
import { AssetEditComponent } from './components/asset-edit';
import { CreditsComponent } from './components/credits/credits.component';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { ExchangeDetailComponent } from './components/exchange-detail/exchange-detail.component';
import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';
import { NavAuthComponent } from './components/nav-auth/nav.component';
import { HeaderAuthComponent } from './components/header-auth/header.component';

const PUBLIC_ROUTES: Routes = [
  { path: '', component: LandingComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '' , component: NavComponent, outlet: 'nav' },
  { path: '' , component: HeaderComponent, outlet: 'header'},
];

const SECURE_ROUTES: Routes = [
  { path: 'main', component: HomeComponent },
  { path: 'assets', component: AssetListComponent },
  { path: 'assets/search/:term', component: AssetListComponent },
  { path: 'assets/new', component: AssetEditComponent },
  { path: 'assets/detail/:id', component: AssetDetailComponent },
  { path: 'assets/edit/:id', component: AssetEditComponent },
  { path: 'credits', component: CreditsComponent },
  { path: 'exchanges', component: ExchangeComponent },
  { path: 'exchanges/detail/:id', component: ExchangeDetailComponent },
  { path: '', component: NavAuthComponent, outlet: 'nav' },
  { path: '', component: HeaderAuthComponent, outlet: 'header'}
];

export const ROUTES: Routes = [
  { path: '', children: PUBLIC_ROUTES },
  { path: '', children: SECURE_ROUTES, canActivate: [AuthGuard] },
  { path: '**', component: NoContentComponent }
];
