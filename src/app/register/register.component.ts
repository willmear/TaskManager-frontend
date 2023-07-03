import { Component, OnInit } from '@angular/core';
import { NewUser } from '../entities/user/user.model';
import { UserService } from '../entities/user/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  confirmationMessage: string;

  constructor(protected userService: UserService) {
    this.confirmationMessage = '';
  }

  ngOnInit(): void {
      
  }

  onRegister(user: NewUser): void {
    if (!this.isEmailValid(user.email)) {
      this.confirmationMessage = 'Invalid Email';
      return;
    }
    if (user.password.length < 8 || user.password.length > 16) {
      this.confirmationMessage = 'Password must be between 8 and 16 characters';
      return;
    }
    if (user.password !== user.confirmationPassword) {
      this.confirmationMessage = 'Passwords do not match';
      return;
    }
    if (user.firstname.length < 1 || user.lastname.length < 1) {
      this.confirmationMessage = 'Enter a first and last name';
      return;
    }
    user.confirmationPassword = undefined;
    this.userService.register(user).subscribe({
      next: data => {
        console.log(data);
        this.confirmationMessage = 'User Registered';
      },
      error: error => {
        console.log(error);
        if (error.status === 409) {
          this.confirmationMessage = 'User Already Exists';
        } else {
          this.confirmationMessage = 'Error Registering User. Try Again.';
        }
      }
    });
    this.ngOnInit();
  }

  isEmailValid(email: string): boolean {
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    return regexp.test(email);
  }
}
