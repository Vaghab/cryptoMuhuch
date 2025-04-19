/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { MockServiceService } from './mock-service.service';

describe('Service: Authentication', () => {
  let service: AuthenticationService;
  let mockLocaleStorage: Storage;
  let mockService: MockServiceService;
  let mockDoc: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService],
    });

    service = TestBed.inject(AuthenticationService);
    mockService = TestBed.inject(MockServiceService);
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

  it('При выходе должен удалять данные из localStorage', (done) => {
    service.logoutUser();

    service.isAuthenticated().subscribe((isAuth: boolean) => {
      if (!isAuth) {
        expect(mockLocaleStorage.getItem('auth')).toBeNull();
        done();
      }
    });
  });

  it('Должен установить статус авторизации на true при вызове метода refreshAuthentication()', (done) => {
    service.refreshAuthentication();

    service.isAuthenticated().subscribe((isAuth: boolean) => {
      expect(isAuth).toBeTruthy();
      done();
    });
  });

  it('должен вернуть статус авторизации', (done) => {
    service.isAuthenticated().subscribe((isAuth: boolean) => {
      if (isAuth) {
        expect(isAuth).toBeTruthy();
        done();
      } else {
        expect(isAuth).toBeFalsy();
        done();
      }
    });
  });

  it('при авторизации должен установить статус авторизации на true и сохранить данные в localStorage, в противном случае наоборот', (done) => {
    const userData = {
      login: 'test',
      password: 'test',
    };
    service.loginUser(userData);

    if (mockService.searchUser(userData)) {
      service.isAuthenticated().subscribe((isAuth: boolean) => {
        expect(isAuth).toBeTruthy();
      });
      expect(localStorage.getItem('auth')).toBe('true');
      done();
    } else {
      service.isAuthenticated().subscribe((isAuth: boolean) => {
        expect(isAuth).toBeFalsy();
      });
      expect(localStorage.getItem('auth')).toBeNull();
      done();
    }
  });

  it('должен отправить запрос на создание юзера', () => {
    const userData = {
      name: 'test',
      surname: 'test',
      login: 'test',
      email: 'test',
      phone: 'test',
      password: 'test',
    };
    let id = mockService.getUsers().length + 1;
    const useSpy = spyOn(mockService, 'addUser');

    service.createUser(userData);
    expect(useSpy).toHaveBeenCalledWith({
      ...userData,
      id,
    });
  });
});
