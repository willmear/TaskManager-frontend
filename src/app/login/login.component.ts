import { Component, OnInit } from '@angular/core';
import { UserService } from '../entities/user/service/user.service';
import { AuthUser } from '../entities/user/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  confirmationMessage: String;

  constructor(protected userService: UserService, protected router: Router) {
    this.confirmationMessage = '';
  }
  
  
  ngOnInit(): void {

  }

  onAuth(user: AuthUser): void {
    if (!this.isEmailValid(user.email)) {
      this.confirmationMessage = "Invalid Email";
      return;
    }
    if (user.password.length < 8 || user.password.length > 16) {
      this.confirmationMessage = 'Password must be between 8 and 16 characters';
      return;
    }
    this.userService.authenticate(user).subscribe({
      next: data => {
        const accessToken = data.body?.access_token;
        if (accessToken) {
          this.userService.setToken(accessToken);
        }
        this.userService.setCurrentlyLoggedIn(user.email);
        this.router.navigate(['/home']);
      },
      error: error => {
        console.log(error);
        this.confirmationMessage = "Error Logging In. Try Again."
      }
    });
    this.ngOnInit();
  }

  isEmailValid(email: string): boolean {

    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    return regexp.test(email);
  }



}
