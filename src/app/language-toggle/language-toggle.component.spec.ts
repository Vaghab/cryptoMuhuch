/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';

import { LanguageToggleComponent } from './language-toggle.component';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';

describe('LanguageToggleComponent', () => {
  let fixture: ComponentFixture<LanguageToggleComponent>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
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

    fixture = TestBed.createComponent(LanguageToggleComponent);
    translateService = TestBed.inject(TranslateService);
  });

  it('Компонент создан', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('Установка языка из localStorage при инициализации', () => {
    localStorage.setItem('lang', 'en');
    //создаем слежку за методом use у TranslateService
    const useSpy = spyOn(fixture.componentInstance.translate, 'use');

    //инициализируем компонент
    fixture.componentInstance.ngOnInit();
    // Проверяем, что метод use был вызван с нужным языком
    expect(useSpy).toHaveBeenCalledWith('en');
  });

  it('Выбор русского языка если localStorage пуст', () => {
    const useSpy = spyOn(fixture.componentInstance.translate, 'use');
    localStorage.removeItem('lang');

    fixture.componentInstance.ngOnInit();
    expect(useSpy).toHaveBeenCalledWith('ru');
  });

  it('Переключение на ', () => {
    fixture.componentInstance.selectedLang = 'ru';
    const useSpy = spyOn(fixture.componentInstance.translate, 'use');
    fixture.componentInstance.selectLanguage();
    expect(useSpy).toHaveBeenCalledWith('en');
  });
});
