/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { AuthGuard } from './auth-guard.service';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

describe('Service: AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>;
  let routerSpy: jasmine.SpyObj<Router>;

  let dummyRoute = {} as ActivatedRouteSnapshot;
  let dummyState = {} as RouterStateSnapshot;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthenticationService', [
      'isAuthenticated',
    ]);
    const routerMock = jasmine.createSpyObj('Router', ['createUrlTree']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: AuthenticationService,
          useValue: authSpy,
        },
        {
          provide: Router,
          useValue: routerMock,
        },
      ],
    });

    guard = TestBed.inject(AuthGuard);
    authServiceSpy = TestBed.inject(
      AuthenticationService
    ) as jasmine.SpyObj<AuthenticationService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('Должен вернуть true если пользователь залогинен', (done) => {
    // Эмулируем поведение: пользователь авторизован
    authServiceSpy.isAuthenticated.and.returnValue(of(true));

    const result = guard.canActivate(dummyRoute, dummyState);

    if (result instanceof Observable) {
      result.subscribe((value) => {
        expect(value).toBe(true);
        done();
      });
    } else {
      expect(result).toBe(true);
      done();
    }
  });

  it('Должен перенаправить на страницу авторизации если пользователь не залогинен', (done) => {
    // Эмулируем поведение: пользователь не авторизован
    const mockUrl = {} as UrlTree;
    authServiceSpy.isAuthenticated.and.returnValue(of(false));
    routerSpy.createUrlTree.and.returnValue(mockUrl);

    const result = guard.canActivate(dummyRoute, dummyState);

    if (result instanceof Observable) {
      result.subscribe((value) => {
        expect(value).toBe(mockUrl);
        expect(routerSpy.createUrlTree).toHaveBeenCalledWith([
          '/authentication',
        ]);
        done();
      });
    } else {
      expect(result).toBe(mockUrl);
      expect(routerSpy.createUrlTree).toHaveBeenCalledWith(['/authentication']);
      done();
    }
  });
});
