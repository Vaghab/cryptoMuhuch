import { Injectable } from '@angular/core';
import { User } from 'src/interfaces/interfaces';

const users: User[] = [
  {
    id: 1,
    name: 'John',
    surname: 'Doe',
    login: 'johndoe',
    email: 'XVc0O@gmail.com',
    phone: '+7 (123) 456-78-90',
    password: '121212',
  },
  {
    id: 2,
    name: 'Вагаб',
    surname: 'Вагабов',
    login: 'VaghabVN',
    email: 'vaghabvn@gmail.com',
    phone: '+7 (123) 456-78-90',
    password: '121212',
  },
];

@Injectable({
  providedIn: 'root',
})
export class MockServiceService {
  getUsers(): User[] {
    return users;
  }

  getUserByLogin(login: string): User | undefined {
    return users.find((user: User) => user.login === login);
  }

  addUser(user: User): void {
    const match = users.find(
      (u: User) =>
        u.id === user.id ||
        u.login === user.login ||
        u.email === user.email ||
        u.phone === user.phone
    );

    if (!match) {
      users.push(user);
      console.log('User added successfully');
      return;
    }
    console.log('User already exists');
    throw new Error('User already exists');
  }
}
