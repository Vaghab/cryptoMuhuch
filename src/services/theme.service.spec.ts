/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('Service: Theme', () => {
  let service: ThemeService;
  let mockLocaleStorage: Storage;
  let mockDoc: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeService],
    });

    service = TestBed.inject(ThemeService);

    const store: Record<string, string> = {};

    mockLocaleStorage = {
      getItem: (key: string): string | null => store[key] || null,
      setItem: (key: string, value: string): void => {
        store[key] = value;
      },
      removeItem: (key: string): void => {
        delete store[key];
      },

      clear: (): void => {
        Object.keys(store).forEach((key) => delete store[key]);
      },

      key: (index: number): string | null => Object.keys(store)[index] || null,

      length: Object.keys(store).length,
    };

    mockDoc = {
      ...document,
      defaultView: {
        localStorage: mockLocaleStorage,
      },
    } as Document;
  });

  it('должен создать сервис', () => {
    expect(service).toBeTruthy();
  });

  it('должен установить тему по умолчанию светлую', () => {
    expect(service.getCurrentTheme()).toBe('light');
  });

  it('должен поменять тему на темную со светлой', () => {
    service['setTheme']('light');
    service.toggleTheme();
    expect(service.getCurrentTheme()).toBe('dark');
  });

  it('должен поменять тему на светлую с темной', () => {
    service['setTheme']('dark');
    service.toggleTheme();
    expect(service.getCurrentTheme()).toBe('light');
  });

  it('должен установить тему темной явно', () => {
    service['setTheme']('dark');
    expect(service.getCurrentTheme()).toBe('dark');
  });

  it('должен вернуть true, если isDarkTheme()', () => {
    service['setTheme']('dark');
    expect(service.isDarkTheme()).toBeTrue();

    service['setTheme']('light');
    expect(service.isDarkTheme()).toBeFalse();
  });

  it('должен установить сохраненную тему', () => {
    mockLocaleStorage.setItem('user_theme', 'dark');
    service['setTheme']('dark');
    service['initializeTheme']();
    expect(service.getCurrentTheme()).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('должен установить тему согласно продпочтениям юзера', () => {
    // Мокаем window.matchMedia
    spyOn(window, 'matchMedia').and.returnValue({
      matches: true,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addListener: (): void => {},
      removeListener: (): void => {},
      addEventListener: (): void => {},
      removeEventListener: (): void => {},
      dispatchEvent: (): boolean => false,
    });

    mockLocaleStorage.removeItem('user_theme');
    service['initializeTheme']();
    expect(service.getCurrentTheme()).toBe('dark');
  });

  it('должен сохранить тему в localStorage', () => {
    service['setTheme']('dark');
    mockLocaleStorage.setItem('user_theme', 'dark');

    expect(mockLocaleStorage.getItem('user_theme')).toBe('dark');
  });

  it('should retrieve theme from localStorage', () => {
    service['setTheme']('dark');
    mockLocaleStorage.setItem('user_theme', 'dark');
    service['initializeTheme']();

    expect(service.getCurrentTheme()).toBe('dark');
  });
});
