import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { LanguageToggleComponent } from './language-toggle/language-toggle.component';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
import { AuthenticationComponent } from './authentication/authentication.component';

@Component({
  selector: 'app-root',
  imports: [
    TranslateModule,
    ThemeToggleComponent,
    LanguageToggleComponent,
    AuthenticationComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
