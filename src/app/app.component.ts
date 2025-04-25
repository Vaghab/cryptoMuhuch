import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { LanguageToggleComponent } from './language-toggle/language-toggle.component';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import { ButtonModule } from 'primeng/button';
import { PrimeNG } from 'primeng/config';

@Component({
  selector: 'app-root',
  imports: [
    TranslateModule,
    ThemeToggleComponent,
    LanguageToggleComponent,
    RouterModule,
    ButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public name = 'Muhuch';

  private readonly authService = inject(AuthenticationService);
  private readonly primeNG = inject(PrimeNG);

  ngOnInit(): void {
    this.primeNG.ripple.set(true);
    if (localStorage.getItem('auth') === 'true') {
      this.authService.refreshAuthentication();
    }
  }

  logout() {
    localStorage.removeItem('auth');
    this.authService.logoutUser();
  }
}
