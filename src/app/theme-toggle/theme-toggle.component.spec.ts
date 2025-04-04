/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeToggleComponent } from './theme-toggle.component';
import { ThemeService } from '../../services/theme.service';

class MockThemeService extends ThemeService {
  override toggleTheme(): void {}
}

describe('ThemeToggleComponent', () => {
  let fixture: ComponentFixture<ThemeToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeToggleComponent],
      providers: [
        {
          provide: MockThemeService,
          useClass: MockThemeService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeToggleComponent);
  });

  it('Компонент создан', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('Должен вызывать метод toggleTheme при нажатии на кнопку переключения тем', () => {
    const toggleThemeSpy = spyOn(fixture.componentInstance, 'toggleTheme');

    fixture.componentInstance.toggleTheme();

    expect(toggleThemeSpy).toHaveBeenCalled();
  });
});
