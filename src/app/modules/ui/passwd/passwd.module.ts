import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PasswdComponent } from './passwd.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule
    ],
    declarations: [
        PasswdComponent
    ],
    exports: [
        PasswdComponent
    ]
})
export class PasswdModule { }
