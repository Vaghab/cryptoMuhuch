import { inject, Injectable } from '@angular/core';
import { themes } from '../interfaces/interfaces';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'user_theme';
  private currentTheme: themes = 'light';

  localStorage: Storage | null =
    inject(DOCUMENT).defaultView?.localStorage ?? null;

  private setTheme(theme: themes): void {
    this.currentTheme = theme;
    // Устанавливаем атрибут data-theme на корневом HTML-элементе
    document.documentElement.setAttribute('data-theme', theme);
    // Сохраняем выбор пользователя в localStorage
    if (this.localStorage) {
      this.localStorage.setItem(this.THEME_KEY, theme);
    }
  }

  getCurrentTheme(): themes {
    return this.currentTheme;
  }

  toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(this.currentTheme);
  }

  private initializeTheme(): void {
    // Получаем сохранённую тему из localStorage

    if (!this.localStorage) {
      return;
    }

    const savedTheme: string | null = this.localStorage!.getItem(
      this.THEME_KEY
    );

    // Проверяем системные предпочтения пользователя
    const systemPrefersDark: boolean = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    if (savedTheme) {
      // Если есть сохранённая тема - применяем её
      this.setTheme(savedTheme as 'light' | 'dark');
    } else if (systemPrefersDark) {
      // Если нет сохранённой, но система предпочитает тёмную - применяем тёмную
      this.setTheme('dark');
    } else {
      // Если нет сохранённой или система предпочитает светную - применяем светную
      this.setTheme('light');
    }
  }

  isDarkTheme(): boolean {
    return this.currentTheme === 'dark';
  }
}
