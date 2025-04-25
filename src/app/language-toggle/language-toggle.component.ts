import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-language-toggle',
  templateUrl: './language-toggle.component.html',
  styleUrls: ['./language-toggle.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TranslateService],
  imports: [ButtonModule],
})
export class LanguageToggleComponent implements OnInit {
  public readonly translate = inject(TranslateService);

  public langs: string[] = ['ru', 'en'];
  public selectedLang: string = 'ru';

  ngOnInit() {
    this.translate.use(localStorage.getItem('lang') || 'ru');
  }

  selectLanguage() {
    const lang = this.selectedLang === 'ru' ? 'en' : 'ru';
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    this.selectedLang = lang;
  }
}
