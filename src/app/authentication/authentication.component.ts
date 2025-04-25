import { SignInComponent } from './signIn/signIn.component';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { TabsModule } from 'primeng/tabs';

import { SignUpComponent } from './signup/signup.component';
import { AuthenticationService } from 'src/services/authentication.service';
import { DxTabPanelModule, DxTabsModule } from 'devextreme-angular';
import { LoginUser, UserData } from 'src/interfaces/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SignUpComponent, SignInComponent, DxTabPanelModule, TabsModule],
})
export class AuthenticationComponent implements OnInit {
  private readonly authService = inject(AuthenticationService);
  private readonly router = inject(Router);

  tabs = [
    {
      title: 'Sign In',
      value: 'Sign In',
      content: '<app-sign-up (newUser)="signUp($event)"></app-sign-up>',
    },
    {
      title: 'Sign Up',
      value: 'Sign Up',
      content: '<app-sign-in (loginUser)="signIn($event)"></app-sign-in>',
    },
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
