import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ThemeService } from '../../services/theme.service';
import { DxButtonModule } from 'devextreme-angular';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DxButtonModule],
  providers: [ThemeService],
})
export class ThemeToggleComponent {
  public readonly themeService = inject(ThemeService);

  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
