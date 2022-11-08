import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})
export class DisplayComponent implements OnInit {
  users: User[];
  userForm: FormGroup;
  editIndex: number;
  editUser: User;
  editMode: boolean;

  private userChangeSub: Subscription;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users = this.userService.getUsers();
    this.userChangeSub = this.userService.usersChanged.subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );
    this.initForm();
  }
  edit(index: number) {
    this.editUser = this.userService.getUser(index);
    this.editIndex = index;
    this.editMode = true;
    let firstName = this.editUser.fname;
    let lastName = this.editUser.lname;
    let email = this.editUser.email;
    let phn = this.editUser.phone;
    let cmp = this.editUser.company;
    let DOB = this.editUser.dob;
    let gen = this.editUser.gender;
    let pwd = this.editUser.password;

    this.userForm.setValue({
      fname: firstName,
      lname: lastName,
      email: email,
      phone: phn,
      company: cmp,
      dob: DOB,
      gender: gen,
      password: pwd,
      c_pwd: pwd,
    });
  }

  delete(index: number) {
    this.userService.deleteUser(index);
  }

  private initForm() {
    let firstName = '';
    let lastName = '';
    let email = '';
    let phone = '';
    let company = '';
    let DOB = '';
    let gender = '';
    let password = '';

    this.userForm = new FormGroup({
      fname: new FormControl(firstName, Validators.required),
      lname: new FormControl(lastName, Validators.required),
      email: new FormControl(email, [Validators.required, Validators.email]),
      phone: new FormControl(phone, Validators.required),
      company: new FormControl(company, Validators.required),
      dob: new FormControl(DOB, Validators.required),
      gender: new FormControl(gender, Validators.required),
      password: new FormControl(password, Validators.required),
      c_pwd: new FormControl(password, Validators.required),
    });
  }
  onSubmit() {
    if (this.editMode) {
      this.userService.updateUser(this.editIndex, this.userForm.value);
    } else {
      this.userService.addUser(this.userForm.value);
    }
    this.editMode = false;
    this.userForm.reset();
  }
  onCancel() {
    this.userForm.reset();
  }
}
