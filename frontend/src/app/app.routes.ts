import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Form } from './pages/form/form';
import { Results } from './pages/results/results';
import { Random } from './pages/random/random';
import { AboutUs } from './pages/about-us/about-us';
import { Contact } from './pages/contact/contact';
import { Login } from './pages/login/login';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'form', component: Form, canActivate: [authGuard] },
  { path: 'results/:id', component: Results },
  { path: 'random', component: Random, canActivate: [authGuard] },
  { path: 'about-us', component: AboutUs },
  { path: 'contact', component: Contact },
];
