import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthGuard } from 'src/services/auth-guard.service';

export const routes: Routes = [
  {
    path: 'authentication',
    component: AuthenticationComponent,
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'authentication',
  },
];
