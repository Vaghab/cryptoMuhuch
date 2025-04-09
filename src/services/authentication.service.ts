import { inject, Injectable } from '@angular/core';
import { LoginUser, UserData } from 'src/interfaces/interfaces';
import { MockServiceService } from './mock-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly mock = inject(MockServiceService);
  createUser(userData: UserData) {
    let id = this.mock.getUsers().length + 1;
    this.mock.addUser({ ...userData, id });
    if (!!Error) {
      console.log(Error, 'Что-то пошло не так');
    }
    if (!Error) {
      console.log('Все четко');
    }
  }

  loginUser(userData: LoginUser) {
    console.log(userData);
  }
}
