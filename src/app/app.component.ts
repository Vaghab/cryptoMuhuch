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
import { DxButtonModule } from 'devextreme-angular';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-root',
  imports: [
    TranslateModule,
    ThemeToggleComponent,
    LanguageToggleComponent,
    RouterModule,
    DxButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public name = 'Angular';

  private readonly authService = inject(AuthenticationService);

  ngOnInit(): void {
    if (localStorage.getItem('auth') === 'true') {
      this.authService.refreshAuthentication();
    }
  }

  logout() {
    localStorage.removeItem('auth');
    this.authService.logoutUser();
  }
}
