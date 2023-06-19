import { Component } from '@angular/core';
import { UserService } from './entities/user/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'taskmanagerwebapp';

  constructor(protected userService: UserService, protected router: Router) {

  }

  ngOnInit(): void {
    
  }

  loggedIn() {
    return this.userService.isLoggedIn();
  }

  logout() {
    this.userService.clear();
    this.router.navigate(['/home']);
  }
}
