import { Routes } from '@angular/router';

import { HomeComponent } from './components/home';
import { NoContentComponent } from './components/no-content';
import { RegisterComponent } from './modules/users/register.component';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'register',  component: RegisterComponent },
  { path: '**',    component: NoContentComponent },
];
