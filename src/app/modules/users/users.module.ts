import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import 'rxjs/add/operator/map';

import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';
import { UsersService } from './users.service';
import { UserModel } from './user.model';
import { PasswdModule } from '../ui/passwd';
import { ValidateModule } from '../ui/validate';
import { AlertModule } from '../ui/alert';
import { NotifyModule, NotifyService } from '../ui/notify';

@NgModule({
    imports: [
                CommonModule, RouterModule, HttpModule, FormsModule, ReactiveFormsModule,
                PasswdModule, ValidateModule, AlertModule, NotifyModule
             ],
    exports: [RegisterComponent, LoginComponent],
    declarations: [RegisterComponent, LoginComponent],
    providers: [UsersService, UserModel, NotifyService],
})
export class UsersModule { }
