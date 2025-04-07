import { Injectable } from '@angular/core';
import { createUser } from 'src/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  createUser(userData: createUser) {
    console.log(userData);
  }
}
