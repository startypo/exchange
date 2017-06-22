import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import 'rxjs/add/operator/map';

import { UserService } from './user.service';
import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';
import { PasswdModule } from '../ui/passwd';
import { ValidateModule } from '../ui/validate';
import { NotifyModule, NotifyService } from '../ui/notify';

@NgModule({
    imports: [
                CommonModule, RouterModule, HttpModule, FormsModule, ReactiveFormsModule,
                PasswdModule, ValidateModule, NotifyModule
             ],
    exports: [RegisterComponent, LoginComponent],
    declarations: [RegisterComponent, LoginComponent],
    providers: [UserService, NotifyService],
})
export class UserModule { }
