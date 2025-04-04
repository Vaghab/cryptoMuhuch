import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { LanguageToggleComponent } from './language-toggle/language-toggle.component';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    TranslateModule,
    ThemeToggleComponent,
    LanguageToggleComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'softapp';
}
