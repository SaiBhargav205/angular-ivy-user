import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  usersChanged = new Subject<User[]>();

  private users: User[] = [
    new User(
      'Sai Bhargav',
      'P',
      'saibhargav@gmail.com',
      1234567890,
      'Infosys',
      '1998-03-21',
      'pasword',
      'male'
    ),
    new User(
      'Rahul',
      'Dev',
      'rahul@gmail.com',
      1234567890,
      'CTS',
      '1993-12-02',
      'pasword',
      'male'
    ),
  ];
  constructor() {}
  getUsers() {
    return this.users.slice();
  }
  getUser(index: number) {
    return this.users[index];
  }
  addUser(user: User) {
    this.users.push(user);
    this.usersChanged.next(this.users.slice());
  }
  deleteUser(index: number) {
    this.users.splice(index, 1);
    this.usersChanged.next(this.users.slice());
  }
  updateUser(index, data) {
    this.users[index] = data;
    this.usersChanged.next(this.users.slice());
  }
}
