import { SignInComponent } from './signIn/signIn.component';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { SignUpComponent } from './signup/signup.component';
import { AuthenticationService } from 'src/services/authentication.service';
import { DxTabPanelModule } from 'devextreme-angular';
import { LoginUser, UserData } from 'src/interfaces/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SignUpComponent, SignInComponent, DxTabPanelModule],
})
export class AuthenticationComponent implements OnInit {
  private readonly authService = inject(AuthenticationService);
  private readonly router = inject(Router);

  dataSource: { title: string }[] = [
    {
      title: 'Sign In',
    },
    { title: 'Sign Up' },
  ];

  ngOnInit(): void {}

  signUp(event: UserData) {
    this.authService.createUser(event);
  }

  signIn(user: LoginUser) {
    this.authService.loginUser(user);
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
      return;
    }
    console.log('Вход не выполнен');
  }
}
