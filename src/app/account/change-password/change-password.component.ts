import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  changePassword(password: {oldPassword: string, newPassword: string, confirmPassword: string}) {
    
    // TODO: Implement change password functionality

  }

}
