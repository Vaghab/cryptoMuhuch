import { inject, Injectable } from '@angular/core';
import { LoginUser, UserData } from 'src/interfaces/interfaces';
import { MockServiceService } from './mock-service.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly mock = inject(MockServiceService);
  private readonly loggedUser = new BehaviorSubject<boolean>(false);

  createUser(userData: UserData) {
    // Добить метод
    let id = this.mock.getUsers().length + 1;
    this.mock.addUser({ ...userData, id });
  }

  loginUser(userData: LoginUser): void {
    if (this.mock.searchUser(userData)) {
      localStorage.setItem('auth', 'true');
      console.log('Вход выполнен');
      this.loggedUser.next(true);
    } else {
      console.log('Вход не выполнен');
      this.loggedUser.next(false);
    }
  }

  logoutUser(): void {
    localStorage.removeItem('auth');
    this.loggedUser.next(false);
  }

  refreshAuthentication() {
    this.loggedUser.next(true);
  }

  isAuthenticated(): Observable<boolean> {
    return this.loggedUser.asObservable();
  }
}
