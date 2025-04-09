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

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SignUpComponent, SignInComponent, DxTabPanelModule],
})
export class AuthenticationComponent implements OnInit {
  private readonly authService = inject(AuthenticationService);
  dataSource = [
    {
      title: 'Sign In',
    },
    { title: 'Sign Up' },
  ];
  ngOnInit(): void {}

  signUp(event: any) {
    this.authService.createUser(event);
  }

  signIn(event: any) {
    this.authService.loginUser(event);
  }
}
