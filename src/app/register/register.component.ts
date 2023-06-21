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
    this.userService.register(user).subscribe({
      next: data => {
        console.log(data);
        this.confirmationMessage = 'User Registered';
      },
      error: error => {
        console.log(error);
        this.confirmationMessage = 'Error Registering User. Try Again.';
      }
    });
    this.ngOnInit();
  }
}
