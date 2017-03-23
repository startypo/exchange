import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';
import { UsersService } from './users.service';
import { UserModel } from './user.model';
import { PasswdModule } from '../ui/passwd';
import { ValidateModule } from '../ui/validate';

@NgModule({
    imports: [FormsModule, ReactiveFormsModule, PasswdModule, ValidateModule],
    exports: [RegisterComponent, LoginComponent],
    declarations: [RegisterComponent, LoginComponent],
    providers: [UsersService, UserModel],
})
export class UsersModule { }
