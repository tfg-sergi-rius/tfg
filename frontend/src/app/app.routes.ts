import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Form } from './pages/form/form';
import { Results } from './pages/results/results';
import { Random } from './pages/random/random';
import { AboutUs } from './pages/about-us/about-us';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'form', component: Form },
  { path: 'results/:id', component: Results },
  { path: 'random', component: Random },
  { path: 'about-us', component: AboutUs },
  { path: 'contact', component: Contact }
];
