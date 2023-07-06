import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChangePasswordComponent } from './change-password/change-password.component';



@NgModule({
  declarations: [
    AccountComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    NgbModule,
    FormsModule,
    FontAwesomeModule,
  ]
})
export class AccountModule { }
