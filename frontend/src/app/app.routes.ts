import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Form } from './pages/form/form';
import { Results } from './pages/results/results';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'form', component: Form },
  { path: 'results/:id', component: Results }
];