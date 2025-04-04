import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { LanguageToggleComponent } from './language-toggle/language-toggle.component';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        ThemeToggleComponent,
        LanguageToggleComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
  });

  it('Должен создать компонент', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('Должен отображать тумблеры тем и языка в заголовке', () => {
    const header = fixture.nativeElement.querySelector('header');
    const themeToggle = fixture.nativeElement.querySelector('app-theme-toggle');
    const langToggle = fixture.nativeElement.querySelector(
      'app-language-toggle'
    );

    expect(header).toBeTruthy();
    expect(themeToggle).toBeTruthy();
    expect(langToggle).toBeTruthy();
  });
});
